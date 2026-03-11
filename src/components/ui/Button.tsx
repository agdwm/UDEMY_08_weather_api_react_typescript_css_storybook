import { clsx } from "clsx";
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
    const btnClasses = clsx("c-btn", { "is-loading": loading }, className);

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={btnClasses}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
