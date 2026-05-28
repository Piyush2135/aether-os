"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { terminalCommands, type TerminalLine } from "./terminalCommands";
import { ChevronRight } from "lucide-react";

const createEntryId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

type TerminalEntry = {
  id: string;
  command: string;
  lines: TerminalLine[];
};

const splitCommand = (input: string) => input.trim().toLowerCase();

type TerminalAppProps = {
  onLaunchAICore?: () => void;
};

export default function TerminalApp({ onLaunchAICore }: TerminalAppProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const historyEndRef = useRef<HTMLDivElement | null>(null);

  const commandList = useMemo(
    () => Object.keys(terminalCommands).sort(),
    []
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursorVisible((state) => !state);
    }, 500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const appendLines = (entryId: string, lines: TerminalLine | TerminalLine[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setEntries((current) =>
      current.map((entry) =>
        entry.id === entryId
          ? { ...entry, lines: [...entry.lines, ...newLines] }
          : entry
      )
    );
  };

  const runCommand = (value: string) => {
    const command = value.trim();
    if (!command) return;

    const entryId = createEntryId();
    setEntries((current) => [
      ...current,
      {
        id: entryId,
        command,
        lines: [{ text: `> ${command}`, tone: "command" }],
      },
    ]);

    setInputValue("");

    const normalized = splitCommand(command);
    if (normalized === "clear") {
      setEntries([]);
      return;
    }

    const commandHandler = terminalCommands[normalized];
    if (commandHandler) {
      if (normalized === "launch ai-core" && onLaunchAICore) {
        onLaunchAICore();
      }
      commandHandler.execute([], (lines) => appendLines(entryId, lines));
      return;
    }

    appendLines(entryId, [
      { text: `Command not found: ${command}`, tone: "error" },
      { text: "Type 'help' for available commands.", tone: "muted" },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(inputValue);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Terminal Shell</p>
        <p className="mt-3 text-base text-gray-200 leading-7">
          Execute commands, inspect logs, and manage low-level OS services from the Aether command shell.
        </p>
      </div>

      <div className="relative rounded-[1.75rem] border border-white/10 bg-black/20 p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
        <div className="absolute left-4 top-4 h-1 w-24 rounded-full bg-cyan-400/20 blur-xl" />
        <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-cyan-300/75">
          <span>Session</span>
          <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-cyan-100">live</span>
        </div>

        <div className="relative rounded-[1.5rem] border border-white/10 bg-[#03101c]/90 p-4 font-mono text-sm text-green-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%)] pointer-events-none" />
          <div className="relative max-h-[20rem] space-y-3 overflow-y-auto pr-3 text-sm leading-6">
            {entries.length === 0 ? (
              <div className="text-gray-400">Type &quot;help&quot; to begin.</div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="space-y-2">
                  {entry.lines.map((line, index) => (
                    <div
                      key={`${entry.id}-${index}`}
                      className={`terminal-line ${
                        line.tone === "highlight"
                          ? "text-cyan-200"
                          : line.tone === "system"
                          ? "text-gray-300"
                          : line.tone === "muted"
                          ? "text-gray-500"
                          : line.tone === "error"
                          ? "text-rose-300"
                          : "text-green-200"
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>
              ))
            )}
            <div ref={historyEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
            <ChevronRight className="h-4 w-4 text-cyan-300" />
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              placeholder="Enter command..."
              autoComplete="off"
              autoFocus
            />
            <span className={
              `h-4 w-1 rounded-full bg-cyan-300 transition-opacity duration-150 ${cursorVisible ? "opacity-100" : "opacity-0"}`
            } />
          </form>
        </div>

        <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between">
            <span className="uppercase tracking-[0.25em] text-[0.65rem] text-cyan-300/80">Quick commands</span>
            <span className="text-[0.65rem] text-gray-400">enter to submit</span>
          </div>
          <ul className="mt-3 space-y-2 leading-6 text-white/80">
            {commandList.map((command) => (
              <li key={command}>{command}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
