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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        <div className="mb-6 rounded-full bg-cyan-400/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
          Futuristic Browser Operating System
        </div>

        <h1 className="text-8xl font-black tracking-[0.3em] text-cyan-300 drop-shadow-[0_0_40px_rgba(34,211,238,0.9)] sm:text-9xl">
          AETHER
        </h1>

        <p className="mt-6 max-w-2xl text-gray-300 text-xl tracking-[0.05em] leading-8">
          AI-powered interface with premium glassmorphism, live status, and a hover-ready neural dashboard.
        </p>

        <button className="mt-10 inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-cyan-400/25 via-sky-400/20 to-violet-400/25 px-12 py-4 text-cyan-100 shadow-[0_20px_80px_rgba(34,211,238,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 border border-cyan-300/20 backdrop-blur-xl">
          Initialize Neural Core
        </button>

      </div>

      <div className="relative z-10 mx-auto mt-16 w-full max-w-[600px] px-4">
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
