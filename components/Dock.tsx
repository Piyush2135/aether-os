"use client";

import type { AppDefinition, AppId } from "./apps/appData";

type DockProps = {
  apps: AppDefinition[];
  onOpen: (appId: AppId) => void;
};

export default function Dock({ apps, onOpen }: DockProps) {
  return (
    <div className="pointer-events-auto flex items-center justify-center gap-5 rounded-[2rem] border border-white/10 bg-black/20 px-5 py-4 shadow-[0_0_45px_rgba(0,0,0,0.18)] backdrop-blur-3xl backdrop-saturate-150">
      {apps.map((app) => {
        const Icon = app.icon;
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpen(app.id)}
            className="group relative flex h-16 w-16 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-500/12 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            aria-label={`Open ${app.title}`}
          >
            <span className="pointer-events-none absolute inset-0 rounded-3xl bg-cyan-400/0 transition-opacity duration-300 group-hover:opacity-15" />
            <Icon className="relative h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative mt-2 hidden text-[0.65rem] uppercase tracking-[0.25em] text-cyan-200 sm:block">
              {app.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
