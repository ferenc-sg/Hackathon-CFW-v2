"use client";

import { useFormStatus } from "react-dom";

// Submit button that shows progress and disables itself (and prevents duplicate
// submissions) while its parent <form> action is pending.
export function SubmitButton({
  children,
  pendingText,
  className = "btn-primary",
  disabled,
  name,
  value,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" name={name} value={value} disabled={pending || disabled} className={className}>
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
