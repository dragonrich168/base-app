import { useCallback, useMemo, useState, type ReactNode } from "react";
import { createId } from "../lib/id";
import type { ToastMessage, ToastTone } from "../types/toast";
import { ToastContext } from "./toast-context";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (title: string, tone: ToastTone = "info", body?: string) => {
      const id = createId("toast");
      setToasts((current) => [...current, { id, title, body, tone }]);
      window.setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ toasts, pushToast, dismissToast }), [toasts, pushToast, dismissToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
