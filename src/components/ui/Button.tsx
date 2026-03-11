import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const Button = ({
  children,
  className = "",
  type = "button",
  disabled,
  loading = false,
  ...props
}: ButtonProps) => {
  const isDisabled = Boolean(disabled || loading);
  const loadingClassName = loading ? "is-loading" : "";

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`c-btn ${loadingClassName} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
