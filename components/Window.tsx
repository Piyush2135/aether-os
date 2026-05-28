"use client";
import { useEffect, useRef, useState } from "react";

type WindowProps = {
  title: string;
  children: React.ReactNode;
};

export default function Window({ title, children }: WindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current) return;
      event.preventDefault();
      const dx = event.clientX - dragStart.current.x;
      const dy = event.clientY - dragStart.current.y;
      setPosition({
        x: initialPosition.current.x + dx,
        y: initialPosition.current.y + dy,
      });
    };

    const handlePointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStart.current = { x: event.clientX, y: event.clientY };
    initialPosition.current = { x: position.x, y: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return (
    <section
      aria-label={title}
      className="relative mx-auto mt-12 w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_30px_90px_rgba(2,12,27,0.45)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 opacity-90" />

      <div
        className="window-header flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-white/10 backdrop-blur-xl cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
      >
        <div className="space-y-1">
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-cyan-300/80">
            Neural Interface
          </p>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.45)]" />
          <div className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.35)]" />
          <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(34,197,94,0.35)]" />
        </div>
      </div>

      <div className="p-6 text-gray-200">
        {children}
      </div>
    </section>
  );
}
