"use client";
import Window from "@/components/Window";

import { Cpu, Folder, Globe, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full h-12 backdrop-blur-xl bg-white/5 border-b border-white/10 flex items-center justify-between px-6 z-20">
        <h1 className="text-cyan-400 font-semibold tracking-widest">
          AETHER OS
        </h1>

        <div className="text-gray-300 text-sm">
          Neural Interface Active
        </div>
      </div>

      {/* Center Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">

        <h1 className="text-8xl font-black tracking-widest text-cyan-400 drop-shadow-[0_0_35px_rgba(34,211,238,0.9)]">
          AETHER
        </h1>

        <p className="mt-6 text-gray-300 text-xl tracking-wide">
          AI-Powered Futuristic Browser Operating System
        </p>

        <button className="mt-10 px-10 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-400 text-cyan-300 backdrop-blur-xl hover:scale-105 hover:bg-cyan-500/20 transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
          Initialize Neural Core
        </button>

      </div>

      <div className="relative z-10 mx-auto mt-12 w-full max-w-[560px] px-4">
        <Window title="Neural Dashboard">
          <p className="text-lg">
            Welcome to Aether OS.
          </p>

          <p className="mt-4 text-gray-400">
            Neural systems online. AI core initialized successfully.
          </p>
        </Window>
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 px-8 py-4 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/10 shadow-[0_0_35px_rgba(255,255,255,0.08)]">

          <div className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer">
            <Cpu className="text-cyan-300" />
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer">
            <Folder className="text-cyan-300" />
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer">
            <Globe className="text-cyan-300" />
          </div>

          <div className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer">
            <Terminal className="text-cyan-300" />
          </div>

        </div>
      </div>

    </main>
  );
}