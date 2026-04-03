import { appendFile, mkdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LOG_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOG_DIR, "app-actions.log");
const MAX_REQUEST_BYTES = 10_000;
const MAX_STRING_VALUE = 240;
const MAX_EXTRA_FIELDS = 20;
const MAX_LOG_FILE_BYTES = 5_000_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 180;
const EVENT_TYPE_PATTERN = /^[a-z0-9_-]{1,40}$/i;

const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

type LogBody = {
  timestamp?: string;
  sessionId?: string;
  eventType?: string;
  path?: string;
  hash?: string;
  target?: string;
  text?: string;
  value?: string;
  extra?: Record<string, string | number | boolean | null>;
};

function jsonNoStore(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function clip(value: string, max = MAX_STRING_VALUE): string {
  return value.slice(0, max);
}

function sanitizeString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return clip(value.trim());
}

function sanitizeTimestamp(value: unknown): string {
  if (typeof value !== "string") return new Date().toISOString();
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return new Date().toISOString();
  return new Date(parsed).toISOString();
}

function sanitizeEventType(value: unknown): string {
  const cleaned = sanitizeString(value, "unknown").toLowerCase();
  return EVENT_TYPE_PATTERN.test(cleaned) ? cleaned : "unknown";
}

function sanitizeSessionId(value: unknown): string {
  const cleaned = sanitizeString(value, "unknown");
  if (!/^[a-z0-9-_.:]{6,80}$/i.test(cleaned)) return "unknown";
  return cleaned;
}

function sanitizeExtra(value: unknown): Record<string, string | number | boolean | null> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const entries = Object.entries(value as Record<string, unknown>).slice(0, MAX_EXTRA_FIELDS);
  const out: Record<string, string | number | boolean | null> = {};

  for (const [rawKey, rawVal] of entries) {
    const key = sanitizeString(rawKey, "").toLowerCase();
    if (!key) continue;

    if (typeof rawVal === "string") {
      out[key] = clip(rawVal.trim());
      continue;
    }
    if (typeof rawVal === "number" && Number.isFinite(rawVal)) {
      out[key] = rawVal;
      continue;
    }
    if (typeof rawVal === "boolean" || rawVal === null) {
      out[key] = rawVal;
    }
  }

  return Object.keys(out).length > 0 ? out : null;
}

function sanitizeBody(body: LogBody): LogBody {
  const sanitizedExtra = sanitizeExtra(body.extra);

  return {
    timestamp: sanitizeTimestamp(body.timestamp),
    sessionId: sanitizeSessionId(body.sessionId),
    eventType: sanitizeEventType(body.eventType),
    path: sanitizeString(body.path),
    hash: sanitizeString(body.hash),
    target: sanitizeString(body.target),
    text: sanitizeString(body.text),
    value: sanitizeString(body.value),
    extra: sanitizedExtra ?? undefined,
  };
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return clip(forwarded.split(",")[0].trim(), 64);

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return clip(realIp.trim(), 64);

  return "unknown";
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(clientKey);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientKey, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function isSameOriginRequest(request: Request): boolean {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");

  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.protocol !== requestUrl.protocol || originUrl.host !== requestUrl.host) {
        return false;
      }
    } catch {
      return false;
    }
  }

  const secFetchSite = (request.headers.get("sec-fetch-site") ?? "").toLowerCase();
  if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
    return false;
  }

  return true;
}

function canReadLogs(request: Request): boolean {
  const token = process.env.LOG_VIEW_TOKEN;
  if (!token) return false;

  const provided = request.headers.get("x-log-view-token");
  return provided === token;
}

async function writeLog(entry: LogBody) {
  await mkdir(LOG_DIR, { recursive: true });

  try {
    const info = await stat(LOG_FILE);
    if (info.size >= MAX_LOG_FILE_BYTES) return;
  } catch {
    // File might not exist yet.
  }

  const line = JSON.stringify({
    timestamp: entry.timestamp ?? new Date().toISOString(),
    sessionId: entry.sessionId ?? "unknown",
    eventType: entry.eventType ?? "unknown",
    path: entry.path ?? "",
    hash: entry.hash ?? "",
    target: entry.target ?? "",
    text: entry.text ?? "",
    value: entry.value ?? "",
    extra: entry.extra ?? null,
  });
  await appendFile(LOG_FILE, `${line}\n`, "utf8");
}

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return jsonNoStore({ ok: false, error: "forbidden_origin" }, 403);
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonNoStore({ ok: false, error: "unsupported_media_type" }, 415);
    }

    const contentLengthHeader = request.headers.get("content-length");
    const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return jsonNoStore({ ok: false, error: "payload_too_large" }, 413);
    }

    const clientKey = getClientIp(request);
    if (isRateLimited(clientKey)) {
      return jsonNoStore({ ok: false, error: "rate_limited" }, 429);
    }

    const body = (await request.json()) as LogBody;
    await writeLog(sanitizeBody(body));
    return jsonNoStore({ ok: true });
  } catch {
    return jsonNoStore({ ok: false }, 400);
  }
}

export async function GET(request: Request) {
  if (!canReadLogs(request)) {
    return jsonNoStore({ ok: false, error: "forbidden" }, 403);
  }

  try {
    const content = await readFile(LOG_FILE, "utf8");
    const lines = content.trim().split("\n").filter(Boolean);
    const recent = lines.slice(-200).map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return { raw: line };
      }
    });
    return jsonNoStore({ ok: true, count: recent.length, recent });
  } catch {
    return jsonNoStore({ ok: true, count: 0, recent: [] });
  }
}
