"use client";

import type { AppDefinition, AppId } from "./apps/appData";
import { AppContent } from "./apps/AppContent";
import Dock from "./Dock";
import Window from "./Window";
import type { ActiveWindow } from "./useWindowManager";

type WindowLayerProps = {
  apps: AppDefinition[];
  windows: ActiveWindow[];
  activeWindowId: string | null;
  onOpen: (appId: AppId) => void;
  onClose: (instanceId: string) => void;
  onFocus: (instanceId: string) => void;
  onMinimize: (instanceId: string) => void;
  onToggleMaximize: (instanceId: string) => void;
  onRestore: (instanceId: string) => void;
  onLaunchAICore?: () => void;
};

export default function WindowLayer({
  apps,
  windows,
  activeWindowId,
  onOpen,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onRestore,
  onLaunchAICore,
}: WindowLayerProps) {
  const minimizedWindows = windows.filter((window) => window.isMinimized);

  return (
    <>
      <div className="absolute inset-0 z-30 pointer-events-none px-4 pt-20 pb-16 sm:px-6 lg:px-10">
        {windows
          .filter((window) => !window.isMinimized)
          .map((window) => (
            <Window
              key={window.instanceId}
              title={window.title}
              icon={window.icon}
              zIndex={window.zIndex}
              initialPosition={window.initialPosition}
              isActive={window.instanceId === activeWindowId}
              isMaximized={window.isMaximized}
              onClose={() => onClose(window.instanceId)}
              onFocus={() => onFocus(window.instanceId)}
              onMinimize={() => onMinimize(window.instanceId)}
              onToggleMaximize={() => onToggleMaximize(window.instanceId)}
            >
              <AppContent appId={window.appId} onLaunchAICore={onLaunchAICore} />
            </Window>
          ))}
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 w-full max-w-3xl -translate-x-1/2 px-4 pointer-events-none">
        <div className="pointer-events-auto mb-4 flex flex-wrap items-center justify-center gap-3">
          {minimizedWindows.map((window) => (
            <button
              key={window.instanceId}
              type="button"
              onClick={() => onRestore(window.instanceId)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              Restore {window.title}
            </button>
          ))}
        </div>
        <div className="pointer-events-auto">
          <Dock apps={apps} onOpen={onOpen} />
        </div>
      </div>
    </>
  );
}
