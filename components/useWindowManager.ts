"use client";
import { useRef, useState } from "react";
import type { AppDefinition, AppId } from "./apps/appData";
import type { LucideIcon } from "lucide-react";

export type ActiveWindow = {
  instanceId: string;
  appId: AppId;
  title: string;
  icon: LucideIcon;
  zIndex: number;
  initialPosition: { x: number; y: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
};

export function useWindowManager(apps: AppDefinition[]) {
  const [windows, setWindows] = useState<ActiveWindow[]>([]);
  const [topZIndex, setTopZIndex] = useState(40);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const lastOpenTime = useRef(0);

  const setTopWindow = (instanceId: string) => {
    const next = topZIndex + 1;
    setTopZIndex(next);
    setActiveWindowId(instanceId);
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, zIndex: next, isMinimized: false }
          : window
      )
    );
  };

  const openApp = (appId: AppId) => {
    const now = performance.now();
    if (now - lastOpenTime.current < 200) return;
    lastOpenTime.current = now;

    const appDefinition = apps.find((app) => app.id === appId);
    if (!appDefinition) return;

    const next = topZIndex + 1;
    setTopZIndex(next);
    const newWindow: ActiveWindow = {
      instanceId: `${appId}-${Date.now()}`,
      appId,
      title: appDefinition.title,
      icon: appDefinition.icon,
      zIndex: next,
      isMinimized: false,
      isMaximized: false,
      initialPosition: {
        x: 72 + windows.length * 30,
        y: 96 + windows.length * 28,
      },
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(newWindow.instanceId);
  };

  const closeWindow = (instanceId: string) => {
    setWindows((prev) => prev.filter((window) => window.instanceId !== instanceId));
    setActiveWindowId((current) => (current === instanceId ? null : current));
  };

  const focusWindow = (instanceId: string) => {
    setTopWindow(instanceId);
  };

  const minimizeWindow = (instanceId: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, isMinimized: true, isMaximized: false }
          : window
      )
    );
    setActiveWindowId(null);
  };

  const toggleMaximizeWindow = (instanceId: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, isMaximized: !window.isMaximized, isMinimized: false }
          : window
      )
    );
    setTopWindow(instanceId);
  };

  const restoreWindow = (instanceId: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, isMinimized: false, isMaximized: false }
          : window
      )
    );
    setTopWindow(instanceId);
  };

  return {
    windows,
    activeWindowId,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    restoreWindow,
  };
}
