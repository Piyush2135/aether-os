"use client";

import type { AppId } from "./appData";

type AppContentProps = {
  appId: AppId;
};

export function AppContent({ appId }: AppContentProps) {
  switch (appId) {
    case "ai-core":
      return (
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">AI Core Dashboard</p>
            <p className="mt-3 text-base text-gray-200 leading-7">
              Neural models are active and learning from ambient system telemetry. Auto-optimization mode is currently engaged.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Inference Load</p>
              <p className="mt-3 text-2xl font-semibold text-white">72%</p>
              <p className="mt-2 text-xs text-gray-400">Sustained processing for adaptive response streams.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Prediction Stability</p>
              <p className="mt-3 text-2xl font-semibold text-white">98.2%</p>
              <p className="mt-2 text-xs text-gray-400">AI confidence across live neural channels.</p>
            </div>
          </div>
        </div>
      );

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
      return (
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Terminal Shell</p>
            <p className="mt-3 text-base text-gray-200 leading-7">
              Execute commands, inspect logs, and monitor low-level OS services from the Aether command shell.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-cyan-300/75">
              <span>Session</span>
              <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-cyan-100">live</span>
            </div>

            <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-[#03101c]/90 p-4 font-mono text-sm text-green-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="space-y-1">
                <p>{'>'} system.status()</p>
                <p className="text-gray-300">Aether Core: Online</p>
                <p className="text-gray-300">Network: Secure</p>
                <p className="text-gray-300">AI Interface: Stable</p>
              </div>
              <div className="space-y-1 border-t border-white/10 pt-4">
                <p>{'>'} storage.check("main")</p>
                <p className="text-gray-300">Storage health: 100%</p>
                <p className="text-gray-300">Active volumes: 3</p>
              </div>
              <div className="space-y-1 border-t border-white/10 pt-4">
                <p>{'>'} security.scan --fast</p>
                <p className="text-gray-300">Threat matrix: clear</p>
                <p className="text-gray-300">Firewall status: hardened</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-[0.25em] text-[0.65rem] text-cyan-300/80">Quick commands</span>
                <span className="text-[0.65rem] text-gray-400">ctrl+enter</span>
              </div>
              <ul className="mt-3 space-y-2 leading-6 text-white/80">
                <li>system.reboot()</li>
                <li>network.trace()</li>
                <li>ai.optimize(mode=fast)</li>
              </ul>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
