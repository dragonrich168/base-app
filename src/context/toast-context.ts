import { createContext } from "react";
import type { ToastMessage, ToastTone } from "../types/toast";

export interface ToastState {
  toasts: ToastMessage[];
  pushToast: (title: string, tone?: ToastTone, body?: string) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastState>({
  toasts: [],
  pushToast: () => undefined,
  dismissToast: () => undefined,
});
