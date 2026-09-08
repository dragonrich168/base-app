import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, id, className, ...props }: TextareaProps) {
  return (
    <label className="field" htmlFor={id}>
      {label ? <span className="field-label">{label}</span> : null}
      <textarea id={id} className={cn("field-input field-textarea", className)} {...props} />
    </label>
  );
}
