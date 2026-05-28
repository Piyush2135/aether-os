"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Maximize2, Minimize2, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type WindowProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  isMaximized?: boolean;
  zIndex?: number;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  onFocus?: () => void;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
  children: React.ReactNode;
};

export default function Window({
  title,
  subtitle,
  icon: Icon,
  isActive = false,
  isMaximized = false,
  zIndex = 20,
  initialPosition = { x: 0, y: 0 },
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
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

  const activeClasses = isActive
    ? "opacity-100 shadow-[0_40px_120px_rgba(34,211,238,0.22)]"
    : "opacity-80 shadow-[0_25px_90px_rgba(0,0,0,0.18)] scale-[0.99]";

  const style = isMaximized
    ? {
        left: 32,
        top: 88,
        width: "calc(100% - 64px)",
        maxWidth: "none",
        height: "calc(100vh - 160px)",
        transform: "none",
        zIndex,
      }
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex,
      };

  return (
    <section
      aria-label={title}
      className={`absolute left-0 top-0 pointer-events-auto overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl transition duration-300 will-change-transform ${activeClasses}`}
      style={style}
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
              onMinimize?.();
            }}
            onPointerDown={(event) => event.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 transition-all duration-200 hover:bg-white/10 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            aria-label="Minimize window"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleMaximize?.();
            }}
            onPointerDown={(event) => event.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 transition-all duration-200 hover:bg-white/10 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
          >
            {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
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
