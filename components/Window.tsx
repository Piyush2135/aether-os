"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type WindowProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  zIndex?: number;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
};

export default function Window({
  title,
  subtitle,
  icon: Icon,
  zIndex = 20,
  initialPosition = { x: 0, y: 0 },
  onClose,
  onFocus,
  children,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialDrag = useRef(initialPosition);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current) return;
      event.preventDefault();
      const dx = event.clientX - dragStart.current.x;
      const dy = event.clientY - dragStart.current.y;
      setPosition({
        x: initialDrag.current.x + dx,
        y: initialDrag.current.y + dy,
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
    initialDrag.current = { x: position.x, y: position.y };
    onFocus?.();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return (
    <section
      aria-label={title}
      className="absolute left-0 top-0 w-full max-w-[540px] pointer-events-auto overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_30px_90px_rgba(2,12,27,0.45)] backdrop-blur-2xl transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_40px_120px_rgba(34,211,238,0.18)]"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, zIndex }}
      onPointerDown={() => onFocus?.()}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 opacity-90" />

      <div className="window-header flex items-center justify-between gap-4 border-b border-white/10 bg-white/10 backdrop-blur-xl">
        <div
          className="flex flex-1 cursor-grab items-center gap-3 px-6 py-4 active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
        >
          {Icon ? <Icon className="h-5 w-5 text-cyan-300" /> : null}
          <div className="space-y-1">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-cyan-300/80">Neural Interface</p>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {subtitle ? <span className="rounded-full bg-white/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-cyan-200">{subtitle}</span> : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose?.();
            }}
            onPointerDown={(event) => event.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 transition-all duration-200 hover:bg-red-500/15 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/30"
            aria-label="Close window"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6 text-gray-200">{children}</div>
    </section>
  );
}
