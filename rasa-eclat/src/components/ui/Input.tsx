import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

const fieldClass =
  "w-full border border-copper/35 bg-obsidian px-4 py-4 font-body text-sm font-light text-ivory transition placeholder:text-ivory-dim/55 focus:border-copper-light focus:outline-none";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className = "", ...props }, ref) => (
  <input ref={ref} className={`${fieldClass} ${className}`} {...props} />
));
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => <textarea ref={ref} className={`${fieldClass} ${className}`} {...props} />
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className = "", ...props }, ref) => (
  <select ref={ref} className={`${fieldClass} ${className}`} {...props} />
));
Select.displayName = "Select";
