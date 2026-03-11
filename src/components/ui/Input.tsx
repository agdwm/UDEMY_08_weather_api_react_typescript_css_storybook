import { clsx } from "clsx";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      type = "text",
      invalid = false,
      loading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const inputClasses = clsx("c-input", { "is-invalid": invalid, "is-loading": loading }, className);

    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={inputClasses}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
