"use client";

import { X } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  description: string;
  variant?: "success" | "info" | "warning";
};

type NotificationCenterProps = {
  notifications: Notification[];
  onDismiss: (id: string) => void;
};

const variantStyles: Record<string, string> = {
  success: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-400/20 bg-amber-500/10 text-amber-200",
  info: "border-cyan-400/20 bg-cyan-500/10 text-cyan-200",
};

export default function NotificationCenter({ notifications, onDismiss }: NotificationCenterProps) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`pointer-events-auto overflow-hidden rounded-3xl border p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-3xl ${variantStyles[notification.variant || "info"]}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{notification.title}</p>
              <p className="mt-1 text-sm text-gray-300">{notification.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(notification.id)}
              className="rounded-full p-2 text-gray-300 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
