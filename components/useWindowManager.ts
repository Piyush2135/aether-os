"use client";
import { useState } from "react";
import type { AppDefinition, AppId } from "./apps/appData";
import type { LucideIcon } from "lucide-react";

export type ActiveWindow = {
  instanceId: string;
  appId: AppId;
  title: string;
  icon: LucideIcon;
  zIndex: number;
  initialPosition: { x: number; y: number };
};

export function useWindowManager(apps: AppDefinition[]) {
  const [windows, setWindows] = useState<ActiveWindow[]>([]);
  const [topZIndex, setTopZIndex] = useState(40);

  const openApp = (appId: AppId) => {
    const appDefinition = apps.find((app) => app.id === appId);
    if (!appDefinition) return;

    setTopZIndex((current) => {
      const next = current + 1;
      setWindows((prev) => [
        ...prev,
        {
          instanceId: `${appId}-${Date.now()}`,
          appId,
          title: appDefinition.title,
          icon: appDefinition.icon,
          zIndex: next,
          initialPosition: {
            x: 72 + prev.length * 30,
            y: 96 + prev.length * 28,
          },
        },
      ]);
      return next;
    });
  };

  const closeWindow = (instanceId: string) => {
    setWindows((prev) => prev.filter((window) => window.instanceId !== instanceId));
  };

  const focusWindow = (instanceId: string) => {
    setTopZIndex((current) => {
      const next = current + 1;
      setWindows((prev) =>
        prev.map((window) =>
          window.instanceId === instanceId ? { ...window, zIndex: next } : window
        )
      );
      return next;
    });
  };

  return {
    windows,
    openApp,
    closeWindow,
    focusWindow,
  };
}
