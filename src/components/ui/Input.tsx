import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <label className="field" htmlFor={id}>
      {label ? <span className="field-label">{label}</span> : null}
      <input id={id} className={cn("field-input", className)} {...props} />
    </label>
  );
}
