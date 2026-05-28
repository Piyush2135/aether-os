"use client";
import { useState } from "react";
import TopBar from "@/components/topbar";
import WindowLayer from "@/components/WindowLayer";
import BootScreen from "@/components/BootScreen";
import NotificationCenter from "@/components/NotificationCenter";
import { useWindowManager } from "@/components/useWindowManager";
import { apps } from "@/components/apps/appData";
import type { AppId } from "@/components/apps/appData";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  variant?: "success" | "info" | "warning";
};

export default function Home() {
  const {
    windows,
    activeWindowId,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    restoreWindow,
  } = useWindowManager(apps);

  const [bootComplete, setBootComplete] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const pushNotification = (notification: Omit<NotificationItem, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setNotifications((current) => [{ id, ...notification }, ...current]);
    window.setTimeout(() => {
      setNotifications((current) => current.filter((item) => item.id !== id));
    }, 5200);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  };

  const handleOpenApp = (appId: AppId) => {
    openApp(appId);
    const app = apps.find((entry) => entry.id === appId);
    if (app) {
      pushNotification({
        title: app.title,
        description: `${app.title} launched successfully.`,
        variant: "success",
      });
    }
  };

  const handleMinimizeWindow = (instanceId: string) => {
    minimizeWindow(instanceId);
    pushNotification({
      title: "Window minimized",
      description: "The window is now available in the taskbar.",
      variant: "info",
    });
  };

  const handleToggleMaximizeWindow = (instanceId: string) => {
    toggleMaximizeWindow(instanceId);
    pushNotification({
      title: "Window updated",
      description: "Window layout has been adjusted.",
      variant: "info",
    });
  };

  const handleLaunchAICore = () => {
    openApp("ai-core");
    pushNotification({
      title: "AI Core",
      description: "Aether neural assistant is now active.",
      variant: "success",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040b] text-white">
      <TopBar brand="AETHER OS" statusLabel="Neural Core Active" statusActive />
      <NotificationCenter notifications={notifications} onDismiss={handleDismissNotification} />
      {!bootComplete && (
        <BootScreen
          onComplete={() => {
            setBootComplete(true);
            pushNotification({
              title: "System Ready",
              description: "Aether OS boot sequence complete.",
              variant: "success",
            });
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-ambient-drift" />
        <div
          className="absolute right-16 top-1/3 h-44 w-44 rounded-full bg-violet-500/8 blur-3xl animate-ambient-drift"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute left-1/3 bottom-20 h-32 w-32 rounded-full bg-sky-400/8 blur-3xl animate-ambient-drift"
          style={{ animationDelay: "4s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle,_rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      <WindowLayer
        apps={apps}
        windows={windows}
        activeWindowId={activeWindowId}
        onOpen={handleOpenApp}
        onClose={closeWindow}
        onFocus={focusWindow}
        onMinimize={handleMinimizeWindow}
        onToggleMaximize={handleToggleMaximizeWindow}
        onRestore={restoreWindow}
        onLaunchAICore={handleLaunchAICore}
      />

      <div className="relative z-10 px-4 pt-20 pb-16 sm:px-6 lg:px-10">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center gap-10 py-8 lg:py-12">
          <div className="w-full max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-cyan-400/15 bg-cyan-400/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              Futuristic Browser Operating System
            </div>

            <h1 className="text-6xl font-black tracking-[0.32em] text-cyan-300 drop-shadow-[0_0_45px_rgba(34,211,238,0.9)] sm:text-7xl lg:text-8xl">
              AETHER
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              A premium cyberpunk OS interface with soft glassmorphism, dynamic system status, and a live neural dashboard built for the next generation of browser experiences.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <button
                type="button"
                onClick={() => handleOpenApp("ai-core")}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/25 via-sky-400/20 to-violet-400/25 px-10 py-4 text-sm font-semibold text-cyan-100 shadow-[0_24px_80px_rgba(34,211,238,0.18)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] border border-cyan-300/20 backdrop-blur-xl"
              >
                Initialize Neural Core
              </button>
              <button
                type="button"
                onClick={() => handleOpenApp("terminal")}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-medium text-gray-200 transition-all duration-300 hover:border-cyan-400/30 hover:text-white hover:bg-white/10"
              >
                Open System Console
              </button>
            </div>
          </div>

          <div className="w-full max-w-[620px] rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-3xl ring-1 ring-white/5">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/10 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Welcome to Aether OS</p>
                <p className="mt-3 text-base text-gray-200 leading-7">
                  Neural systems online. AI core initialized successfully. The operating environment is optimized for low-latency transitions and immersive glassmorphic visuals.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">System Throughput</p>
                  <p className="mt-3 text-2xl font-semibold text-white">98.7%</p>
                  <p className="mt-2 text-xs text-gray-400">Realtime performance monitoring and kernel efficiency.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Network Sync</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Stable</p>
                  <p className="mt-2 text-xs text-gray-400">Secure connectivity across AI services and virtual shells.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-center">
          <div className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-4 text-sm text-gray-300 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-3xl">
            <div className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
            System core stable · Glass AI display ready · Responsive OS simulation
          </div>
        </div>
      </div>
    </main>
  );
}
