export type ToastTone = "info" | "success" | "warn";

export interface ToastMessage {
  id: string;
  title: string;
  body?: string;
  tone: ToastTone;
}
