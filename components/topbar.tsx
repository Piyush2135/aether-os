"use client";

import { Cpu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type TopBarProps = {
  brand?: string;
  statusLabel?: string;
  statusActive?: boolean;
};

export default function TopBar({
  brand = "AETHER OS",
  statusLabel = "Neural Core Active",
  statusActive = true,
}: TopBarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-3xl shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <Cpu className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-cyan-300/70">
              {brand}
            </p>
            <p className="text-sm font-semibold text-white">Live OS Command Center</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center sm:flex-row sm:justify-end sm:text-right sm:items-end gap-3 sm:gap-6">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-cyan-100 shadow-[0_8px_30px_rgba(34,211,238,0.12)]">
            <span className={`${statusActive ? "h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_16px_rgba(52,211,153,0.45)]" : "h-2.5 w-2.5 rounded-full bg-slate-500"}`} />
            <span className="font-medium text-white/90">{statusLabel}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 shadow-[0_8px_30px_rgba(255,255,255,0.08)]">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
