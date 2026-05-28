"use client";

import AiCoreApp from "./AiCoreApp";
import TerminalApp from "./TerminalApp";
import type { AppId } from "./appData";

type AppContentProps = {
  appId: AppId;
  onLaunchAICore?: () => void;
};

export function AppContent({ appId, onLaunchAICore }: AppContentProps) {
  switch (appId) {
    case "ai-core":
      return <AiCoreApp />;

    case "file-system":
      return (
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">File System Explorer</p>
            <p className="mt-3 text-base text-gray-200 leading-7">
              Browse secure drives, vault snapshots, and synced archives from the Aether mainframe.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Recent Files</p>
              <ul className="mt-3 space-y-2 text-gray-300">
                <li>system-log.txt</li>
                <li>aether-config.json</li>
                <li>neural-firmware.bin</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Storage</p>
              <p className="mt-3 text-2xl font-semibold text-white">512 GB</p>
              <p className="mt-2 text-xs text-gray-400">256 GB used · 256 GB available</p>
            </div>
          </div>
        </div>
      );

    case "browser":
      return (
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Secure Portal</p>
            <p className="mt-3 text-base text-gray-200 leading-7">
              Browse encrypted web layers, secure knowledge feeds, and adaptive network channels.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <label className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Address Bar</label>
              <div className="mt-3 flex items-center gap-3 rounded-3xl border border-white/10 bg-black/15 px-4 py-3">
                <span className="text-cyan-200">https://aether.os/portal</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Visited</p>
                <p className="mt-3 text-lg font-semibold text-white">Aether Network</p>
                <p className="mt-2 text-xs text-gray-400">Fast access to system portals and encrypted feeds.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Quick Links</p>
                <ul className="mt-3 space-y-2 text-gray-300">
                  <li>Telemetry Feed</li>
                  <li>Secure Shell</li>
                  <li>AI Interface</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case "terminal":
      return <TerminalApp onLaunchAICore={onLaunchAICore} />;

    default:
      return null;
  }
}
