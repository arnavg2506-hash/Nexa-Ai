"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Eraser, GitCompare, Mic, Send, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { NexaLogo } from "@/components/brand/nexa-logo";
import { copilotPrompts } from "@/lib/platform-data";

type NexaAnalyzeEvent = CustomEvent<{ prompt: string }>;

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const openingMessage: ChatMessage = {
  id: "opening",
  role: "assistant",
  content:
    "Hi, I am NEXA AI. Ask me to compare cities, find land opportunities, scan builder risk, estimate yield, or shortlist where to invest.",
};

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([openingMessage]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 180);
    }
  }, [open]);

  const runPrompt = useCallback(
    async (nextPrompt = prompt) => {
      const trimmedPrompt = nextPrompt.trim();

      if (!trimmedPrompt || loading) {
        return;
      }

      const userMessage = createMessage("user", trimmedPrompt);
      const history = [...messages, userMessage].slice(-8);

      setOpen(true);
      setPrompt("");
      setMessages((current) => [...current, userMessage]);
      setLoading(true);

      try {
        const response = await fetch("/api/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: trimmedPrompt,
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
        });
        const data = (await response.json()) as { answer?: string; error?: string };

        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            data.answer ?? data.error ?? "I could not complete that analysis. Try asking with a city, budget, or asset type.",
          ),
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            "I am offline locally, but I can still help structure the decision: compare growth catalysts, liquidity, title risk, builder trust, rental depth, and exit timing.",
          ),
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, prompt],
  );

  const closeAssistant = useCallback(() => {
    setOpen(false);

    if (window.location.hash === "#copilot") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash === "#copilot") {
        setOpen(true);
      }
    }

    function openFromCopilotLink(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest('a[href="#copilot"], a[href$="/#copilot"]');

      if (!link) {
        return;
      }

      event.preventDefault();
      setOpen(true);

      if (window.location.hash !== "#copilot") {
        window.history.pushState(null, "", "#copilot");
      }
    }

    function analyzeFromHero(event: Event) {
      const nextPrompt = (event as NexaAnalyzeEvent).detail?.prompt;
      setOpen(true);
      void runPrompt(nextPrompt ?? "");
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAssistant();
      }
    }

    openFromHash();
    document.addEventListener("click", openFromCopilotLink);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("nexa-analyze-prompt", analyzeFromHero);

    return () => {
      document.removeEventListener("click", openFromCopilotLink);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener("nexa-analyze-prompt", analyzeFromHero);
    };
  }, [closeAssistant, runPrompt]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runPrompt();
  }

  function resetChat() {
    setMessages([openingMessage]);
    setPrompt("");
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }

  return (
    <div id="copilot" className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div
            id="nexa-copilot-panel"
            role="dialog"
            aria-label="NEXA AI Copilot chat"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="mb-3 flex h-[min(680px,calc(100vh-112px))] w-[min(460px,calc(100vw-28px))] flex-col overflow-hidden rounded-[8px] border border-white/12 bg-graphite-950/92 shadow-glass backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <NexaLogo compact />
                <div>
                  <p className="text-sm font-semibold text-white">NEXA AI Copilot</p>
                  <p className="text-xs text-volt">Chat mode online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Start new chat"
                  onClick={resetChat}
                  className="grid size-8 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <Eraser aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close assistant"
                  onClick={closeAssistant}
                  className="grid size-8 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>

            <div className="border-b border-white/10 px-4 py-3">
              <div className="grid gap-2">
                {copilotPrompts.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void runPrompt(suggestion)}
                    className="flex w-full items-start gap-3 rounded-[8px] border border-volt/18 bg-volt/10 p-2.5 text-left text-xs leading-5 text-volt transition hover:bg-volt/[0.14]"
                  >
                    <GitCompare aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              aria-live="polite"
              aria-busy={loading}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-[8px] px-3 py-2 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-volt text-graphite-950"
                        : "border border-white/10 bg-white/[0.055] text-white/75"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-[8px] border border-white/10 bg-white/[0.055] px-3 py-2 text-sm text-white/65">
                    NEXA is analyzing markets, risks, yield and infrastructure...
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <button
                type="button"
                aria-label="Use sample voice mandate"
                onClick={() => void runPrompt("Compare DMIC, AKIC, VCIC and CBIC for a 1 crore real estate investment.")}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:border-volt/35 hover:text-volt"
              >
                <Mic aria-hidden="true" className="size-4" />
              </button>
              <input
                ref={inputRef}
                aria-label="AI property mandate"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Message NEXA AI..."
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-volt/45 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={loading || !prompt.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-graphite-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send aria-hidden="true" className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        aria-controls="nexa-copilot-panel"
        onClick={() => {
          if (open) {
            closeAssistant();
          } else {
            setOpen(true);
          }
        }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="ml-auto grid size-14 place-items-center rounded-full border border-volt/30 bg-volt text-graphite-950 shadow-[0_0_45px_rgba(120,247,212,0.38)]"
      >
        <Bot aria-hidden="true" className="size-6" />
      </motion.button>
    </div>
  );
}
