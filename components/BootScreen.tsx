"use client";

import { useEffect, useState } from "react";

type BootScreenProps = {
  onComplete: () => void;
};

const bootSteps = [
  "Initializing neural runtime",
  "Loading holographic interface",
  "Syncing secure modules",
  "Calibrating quantum core",
  "Aether OS ready",
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setProgress(18);
        setStepIndex(0);
      }, 300)
    );

    bootSteps.slice(1).forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setProgress((index + 2) * 16);
          setStepIndex(index + 1);
        }, 300 + (index + 1) * 520)
      );
    });

    timers.push(
      window.setTimeout(() => {
        setProgress(100);
      }, 300 + bootSteps.length * 520)
    );

    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, 300 + bootSteps.length * 520 + 800)
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04080f] text-white">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-[0_0_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
        <div className="mb-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Aether OS Startup</p>
          <h1 className="text-4xl font-black tracking-[0.3em] text-cyan-200 sm:text-5xl">
            Boot Sequence
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-gray-300">
            Initializing the system core, engaging neural pathways, and preparing the holographic desktop environment.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>{bootSteps[stepIndex]}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {bootSteps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <p className="font-medium text-white">{`STEP ${index + 1}`}</p>
                <p className="mt-2 leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
