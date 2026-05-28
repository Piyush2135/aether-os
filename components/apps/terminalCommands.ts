export type TerminalLine = {
  text: string;
  tone?: "normal" | "command" | "system" | "highlight" | "muted" | "error";
};

export type TerminalCommand = {
  description: string;
  execute: (args: string[], append: (lines: TerminalLine | TerminalLine[]) => void) => void;
};

export const terminalCommands: Record<string, TerminalCommand> = {
  help: {
    description: "Display available terminal commands.",
    execute: (_, append) => {
      append([
        { text: "Available commands:", tone: "system" },
        { text: "help - Show this command list", tone: "normal" },
        { text: "status - Show neural core status", tone: "normal" },
        { text: "system-info - Show system specifications", tone: "normal" },
        { text: "neural-scan - Run an immersive neural scan", tone: "normal" },
        { text: "launch ai-core - Start the AI core module", tone: "normal" },
        { text: "clear - Clear the terminal history", tone: "normal" },
      ]);
    },
  },
  status: {
    description: "Show neural core and system synchronization state.",
    execute: (_, append) => {
      append([
        { text: "Neural Core Status: ONLINE", tone: "highlight" },
        { text: "Memory Stability: 99.94%", tone: "normal" },
        { text: "Synchronization: Quantum bridge active", tone: "normal" },
        { text: "Network Integrity: Immutable", tone: "normal" },
      ]);
    },
  },
  "system-info": {
    description: "Show futuristic system specifications.",
    execute: (_, append) => {
      append([
        { text: "Aether OS v6.4.3", tone: "highlight" },
        { text: "Core lattice: Neon-12 adaptive mesh", tone: "normal" },
        { text: "AI throughput: 3.2 TP/s", tone: "normal" },
        { text: "Secure memory: 512GB Holographic cache", tone: "normal" },
        { text: "Sensor array: 18-channel quantum feed", tone: "normal" },
      ]);
    },
  },
  "neural-scan": {
    description: "Display an immersive neural scan sequence.",
    execute: (_, append) => {
      append([
        { text: "Initializing neural scan...", tone: "muted" },
      ]);

      setTimeout(() => {
        append([
          { text: "Mapping synaptic channels...", tone: "muted" },
        ]);
      }, 450);

      setTimeout(() => {
        append([
          { text: "Signal coherence: 99.98%", tone: "highlight" },
          { text: "Pulse integrity: stable", tone: "normal" },
        ]);
      }, 900);

      setTimeout(() => {
        append([
          { text: "Neural scan complete. No anomalies detected.", tone: "system" },
        ]);
      }, 1400);
    },
  },
  "launch ai-core": {
    description: "Simulate launching the AI core module.",
    execute: (_, append) => {
      append([
        { text: "Preparing AI core launch sequence...", tone: "muted" },
        { text: "Establishing neural handshake...", tone: "muted" },
        { text: "AI Core initialized successfully.", tone: "highlight" },
        { text: "AI Core is now online and monitoring system protocols.", tone: "normal" },
      ]);
    },
  },
};
