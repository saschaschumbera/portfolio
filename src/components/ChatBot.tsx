"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { findAnswer, SUGGESTIONS } from "./chatbotKnowledge";
import { useIsMounted } from "@/hooks/useIsMounted";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ANSWER_DELAY_MS = 750;
const MAX_INPUT_CHARS = 350;
const MIN_SEND_INTERVAL_MS = 450;
const MAX_STORED_MESSAGES = 40;

function normalizeUserInput(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_INPUT_CHARS);
}

function trimMessageHistory(messages: (Message & { animate?: boolean })[]) {
  if (messages.length <= MAX_STORED_MESSAGES) return messages;
  return messages.slice(-MAX_STORED_MESSAGES);
}

// Simulate typing effect
function useTypingEffect(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [text, active]);
  return displayed;
}

function AssistantBubble({ content, animate }: { content: string; animate: boolean }) {
  const displayed = useTypingEffect(content, animate);
  return (
    <div className="flex justify-start">
      <div
        className="max-w-[82%] px-3 py-2 rounded-2xl rounded-bl-sm text-sm sm:text-[15px] leading-relaxed"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--text-1)",
        }}
      >
        {displayed}
        {animate && displayed.length < content.length && (
          <span className="inline-block w-0.5 h-3 ml-0.5 animate-pulse align-middle" style={{ background: "var(--accent)" }} />
        )}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const mounted = useIsMounted();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<(Message & { animate?: boolean })[]>([
    {
      role: "assistant",
      content:
        "Hi! Ich beantworte gerne Fragen über Sascha — seinen Werdegang, Projekte, Skills oder wie du ihn kontaktieren kannst.",
      animate: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suppressClickUntilRef = useRef(0);
  const openedAtRef = useRef(0);
  const sendCooldownRef = useRef(false);
  const sendCooldownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    return () => {
      if (sendCooldownTimerRef.current !== null) {
        window.clearTimeout(sendCooldownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function setChatOpen(next: boolean) {
    if (next) {
      openedAtRef.current = Date.now();
    }
    setOpen(next);
  }

  function toggleOpen() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        openedAtRef.current = Date.now();
      }
      return next;
    });
  }

  function onButtonTouchEnd(event: React.TouchEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    suppressClickUntilRef.current = Date.now() + 1000;
    toggleOpen();
  }

  function onButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (Date.now() < suppressClickUntilRef.current) {
      event.preventDefault();
      return;
    }
    toggleOpen();
  }

  function onBackdropClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    // iOS can emit a delayed synthetic click after touch; ignore that shortly after opening.
    if (Date.now() - openedAtRef.current < 700) return;
    setChatOpen(false);
  }


  function send(text?: string) {
    const userText = normalizeUserInput(text ?? input);
    if (!userText || thinking) return;
    if (sendCooldownRef.current) return;
    sendCooldownRef.current = true;

    if (sendCooldownTimerRef.current !== null) {
      window.clearTimeout(sendCooldownTimerRef.current);
    }
    sendCooldownTimerRef.current = window.setTimeout(() => {
      sendCooldownRef.current = false;
      sendCooldownTimerRef.current = null;
    }, MIN_SEND_INTERVAL_MS);

    setInput("");

    setMessages((prev) =>
      trimMessageHistory([
        ...prev,
        { role: "user", content: userText, animate: false },
      ])
    );
    setThinking(true);

    // Short delay to feel natural
    setTimeout(() => {
      const answer = findAnswer(userText);
      setThinking(false);
      setMessages((prev) =>
        trimMessageHistory([
          ...prev,
          { role: "assistant", content: answer, animate: true },
        ])
      );
    }, ANSWER_DELAY_MS);
  }

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      <div
        className={`fixed${open ? " hidden sm:block" : ""}`}
        style={{
          width: "3.5rem",
          height: "3.5rem",
          zIndex: 2147483001,
          right: "calc(1rem + env(safe-area-inset-right))",
          bottom: "calc(1rem + env(safe-area-inset-bottom))",
        }}
      >
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#6366f1] animate-ping opacity-75" style={{ pointerEvents: "none" }} />
            <span className="absolute inset-0 rounded-full bg-[#6366f1] animate-ping opacity-75" style={{ pointerEvents: "none", animationDelay: "0.75s" }} />
          </>
        )}
        <button
          type="button"
          onTouchEnd={onButtonTouchEnd}
          onClick={onButtonClick}
          className="absolute inset-0 rounded-full bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/30 flex items-center justify-center"
          style={{
            WebkitTapHighlightColor: "transparent",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 1,
          }}
          aria-label="Chat öffnen"
          aria-expanded={open}
          aria-controls="portfolio-chat-window"
        >
          {open ? <X size={22} /> : (
            <span className="relative chatbot-wave" style={{ pointerEvents: "none" }}>
              <Bot size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22c55e] border border-[#6366f1]" />
            </span>
          )}
        </button>
      </div>

      {/* Dedicated overlay root prevents click-through to page behind */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2147483000,
          pointerEvents: open ? "auto" : "none",
          display: open ? "block" : "none",
        }}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/35"
          onClick={onBackdropClick}
          aria-label="Chat schließen"
        />

        <div
          id="portfolio-chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Sascha Chatbot"
          className="absolute rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden left-2 right-2 top-2 bottom-2 sm:left-auto sm:right-6 sm:top-auto sm:bottom-24 sm:w-[38rem] lg:w-[42rem] sm:min-h-[34rem]"
          style={{
            border: "1px solid var(--border)",
            background: "var(--bg-chat)",
            maxHeight: "min(840px, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 1rem))",
            borderRadius: "1rem",
            pointerEvents: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "color-mix(in srgb, var(--bg-card) 80%, transparent)" }}>
              <div className="w-8 h-8 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/30 flex items-center justify-center">
                <Bot size={15} className="text-[#6366f1]" />
              </div>
              <div>
                <p className="text-sm sm:text-[15px] font-semibold" style={{ color: "var(--text-1)" }}>Sascha&apos;s Assistent</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <p className="text-xs sm:text-sm" style={{ color: "var(--text-3)" }}>Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="ml-auto w-7 h-7 rounded-full flex items-center justify-center"
                style={{ border: "1px solid var(--border)", color: "var(--text-2)" }}
                aria-label="Chat schließen"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[82%] px-3 py-2 rounded-2xl rounded-br-sm text-sm sm:text-[15px] leading-relaxed bg-[#6366f1] text-white">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <AssistantBubble
                    key={i}
                    content={msg.content}
                    animate={!!msg.animate}
                  />
                )
              )}

              {/* Thinking indicator */}
              {thinking && (
                <div className="flex justify-start">
                  <div className="px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0ms]" style={{ background: "var(--text-3)" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms]" style={{ background: "var(--text-3)" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms]" style={{ background: "var(--text-3)" }} />
                  </div>
                </div>
              )}

              {/* Suggestion chips */}
              {messages.length === 1 && !thinking && (
                <div className="flex flex-col gap-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs sm:text-sm px-3 py-1.5 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/08 text-[#94a3b8] hover:border-[#6366f1]/60 hover:text-[#e2e8f0] transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Input */}
            <div
              className="px-3 pt-3"
              style={{
                borderTop: "1px solid var(--border)",
                background: "var(--bg-chat)",
                paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_CHARS))}
                  placeholder="Frage stellen..."
                  disabled={thinking}
                  maxLength={MAX_INPUT_CHARS}
                  className="flex-1 rounded-full px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none transition-colors disabled:opacity-50"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border)",
                    color: "var(--text-1)",
                    fontSize: "16px",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white hover:bg-[#5558e8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
        </div>
      </div>
    </>
  );
}
