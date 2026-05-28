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
}: WindowLayerProps) {
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
              <AppContent appId={window.appId} />
            </Window>
          ))}
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 w-full max-w-3xl -translate-x-1/2 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <Dock apps={apps} onOpen={onOpen} />
        </div>
      </div>
    </>
  );
}
