"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "core";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    sender: "core",
    text: "Neural Core online. I am Aether, your adaptive system assistant. Ask me anything about the operating environment or run a diagnostic command.",
  },
];

export default function AiCoreApp() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const statusLabel = useMemo(() => {
    if (isThinking) return "Computing neural response";
    if (error) return "Connection interrupted";
    return "Adaptive intelligence ready";
  }, [isThinking, error]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const appendMessage = (message: Message) => {
    setMessages((current) => [...current, message]);
  };

  const updateAssistantText = (id: string, text: string) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, text } : message
      )
    );
  };

  const createTranscript = (queuedMessage: Message) => {
    const history = [...messages, queuedMessage];
    return history.slice(-8);
  };

  const handleSend = async () => {
    const trimmed = draft.trim();
    if (!trimmed || isThinking) return;

    const userMessage: Message = {
      id: `user-${crypto.randomUUID()}`,
      sender: "user",
      text: trimmed,
    };

    const assistantId = `assistant-${crypto.randomUUID()}`;
    const assistantPlaceholder: Message = {
      id: assistantId,
      sender: "core",
      text: "Analyzing system state...",
    };

    appendMessage(userMessage);
    appendMessage(assistantPlaceholder);
    setDraft("");
    setError(null);
    setIsThinking(true);

    const transcript = createTranscript(userMessage);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: transcript }),
      });

      if (!response.ok) {
        const messageText = await response.text();
        throw new Error(messageText || "AI service unavailable.");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No streaming response available.");
      }

      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        updateAssistantText(assistantId, assistantText);
      }
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unknown error.";
      setError(message);
      updateAssistantText(assistantId, `Unable to complete request. ${message}`);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">AI Core</p>
            <p className="mt-3 max-w-2xl text-base text-gray-200 leading-7">
              This is the neural intelligence layer of Aether OS. Ask it to inspect system state, optimize workflows, or explain shell commands.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 shadow-[0_12px_40px_rgba(34,211,238,0.12)]">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>{statusLabel}</span>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#06111d]/95 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute left-8 bottom-8 h-16 w-16 rounded-full bg-violet-500/10 blur-3xl" />

          <div
            ref={scrollRef}
            className="max-h-[28rem] space-y-4 overflow-y-auto pr-3 text-sm leading-7 text-gray-100"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`group max-w-3xl rounded-3xl border p-4 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  message.sender === "core"
                    ? "border-white/10 bg-white/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                    : "ml-auto border-cyan-400/20 bg-cyan-500/10 text-cyan-100 shadow-[0_12px_30px_rgba(34,211,238,0.15)]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-cyan-300/70">
                    {message.sender === "core" ? "NEURAL CORE" : "YOU"}
                  </span>
                  {message.sender === "core" && message.id.startsWith("assistant-") && isThinking ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-2 py-1 text-[0.65rem] text-cyan-200">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                      streaming
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 whitespace-pre-wrap text-gray-100">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                className="w-full flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                placeholder="Query the neural core..."
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isThinking || !draft.trim()}
                className="inline-flex h-12 items-center justify-center rounded-3xl bg-cyan-400/18 px-4 text-sm font-semibold text-cyan-100 transition duration-300 hover:bg-cyan-400/28 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              {isThinking ? "Aether is composing a neural response..." : "Use natural commands to inspect or optimize the OS."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
