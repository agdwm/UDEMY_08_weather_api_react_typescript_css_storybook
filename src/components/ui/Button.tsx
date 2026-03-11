import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      type = "button",
      disabled,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const loadingClassName = loading ? "is-loading" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={`c-btn ${loadingClassName} ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
