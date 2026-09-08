import { useToast } from "../../hooks/useToast";

export function ToastStack() {
  const { toasts, dismissToast } = useToast();
  if (!toasts.length) return null;

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <button key={toast.id} type="button" className={`toast toast-${toast.tone}`} onClick={() => dismissToast(toast.id)}>
          <strong>{toast.title}</strong>
          {toast.body ? <span>{toast.body}</span> : null}
        </button>
      ))}
    </div>
  );
}
