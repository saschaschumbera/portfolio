"use client";

import { useEffect, useRef } from "react";

type LogPayload = {
  timestamp: string;
  sessionId: string;
  eventType: string;
  path: string;
  hash: string;
  target?: string;
  text?: string;
  value?: string;
  extra?: Record<string, string | number | boolean | null>;
};

function getTargetDescriptor(target: EventTarget | null): string {
  if (!(target instanceof Element)) return "unknown";

  const tag = target.tagName.toLowerCase();
  const id = target.id ? `#${target.id}` : "";
  const className =
    target.classList.length > 0 ? `.${Array.from(target.classList).slice(0, 3).join(".")}` : "";
  const name = target.getAttribute("name") ? `[name=${target.getAttribute("name")}]` : "";
  return `${tag}${id}${className}${name}`;
}

function safeText(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value.trim().slice(0, 120);
}

function isSensitiveInput(target: HTMLInputElement | HTMLTextAreaElement): boolean {
  const descriptor = `${target.type ?? ""} ${target.name ?? ""} ${target.id ?? ""} ${target.autocomplete ?? ""}`.toLowerCase();
  return /(pass|pwd|token|secret|email|mail|phone|tel|search|iban|card|cvv|otp)/.test(descriptor);
}

export default function UserActionLogger() {
  const lastInputAtRef = useRef(0);

  useEffect(() => {
    let sessionIdCache: string | null = null;

    function getSessionId(): string {
      if (sessionIdCache) return sessionIdCache;

      const key = "portfolio-log-session-id";
      const existing = sessionStorage.getItem(key);
      if (existing) {
        sessionIdCache = existing;
        return existing;
      }

      const generated = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(key, generated);
      sessionIdCache = generated;
      return generated;
    }

    function sendLog(payload: Omit<LogPayload, "timestamp" | "sessionId" | "path" | "hash">) {
      const body: LogPayload = {
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        eventType: payload.eventType,
        path: window.location.pathname,
        hash: window.location.hash,
        target: payload.target,
        text: payload.text,
        value: payload.value,
        extra: payload.extra,
      };

      const raw = JSON.stringify(body);
      if (navigator.sendBeacon) {
        const blob = new Blob([raw], { type: "application/json" });
        navigator.sendBeacon("/api/client-log", blob);
        return;
      }

      fetch("/api/client-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
        keepalive: true,
      }).catch(() => {
        // Best-effort logging only.
      });
    }

    sendLog({ eventType: "page_view" });

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      sendLog({
        eventType: "click",
        target: getTargetDescriptor(target),
        text: safeText(target instanceof HTMLElement ? target.innerText : undefined),
      });
    };

    const onTouchEnd = (event: TouchEvent) => {
      sendLog({
        eventType: "touchend",
        target: getTargetDescriptor(event.target),
        extra: {
          touches: event.changedTouches.length,
        },
      });
    };

    const onSubmit = (event: Event) => {
      sendLog({
        eventType: "submit",
        target: getTargetDescriptor(event.target),
      });
    };

    const onInput = (event: Event) => {
      const now = Date.now();
      if (now - lastInputAtRef.current < 700) return;
      lastInputAtRef.current = now;

      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

      const valueLength = target.value.length;
      const redacted = isSensitiveInput(target);

      sendLog({
        eventType: "input",
        target: getTargetDescriptor(target),
        value: redacted ? undefined : "[redacted]",
        extra: {
          redacted,
          valueLength,
        },
      });
    };

    const onHashChange = () => {
      sendLog({ eventType: "hashchange" });
    };

    const onVisibilityChange = () => {
      sendLog({
        eventType: "visibilitychange",
        extra: { hidden: document.hidden },
      });
    };

    document.addEventListener("click", onClick, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("submit", onSubmit, { passive: true });
    document.addEventListener("input", onInput, { passive: true });
    window.addEventListener("hashchange", onHashChange, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("submit", onSubmit);
      document.removeEventListener("input", onInput);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
