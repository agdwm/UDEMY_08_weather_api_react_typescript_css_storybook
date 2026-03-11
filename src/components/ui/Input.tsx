import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", type = "text", invalid = false, loading = false, disabled, ...props },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const invalidClassName = invalid ? "is-invalid" : "";
    const loadingClassName = loading ? "is-loading" : "";

    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={`c-input ${invalidClassName} ${loadingClassName} ${className}`.trim()}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
