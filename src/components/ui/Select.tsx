import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  loading?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className = "", invalid = false, loading = false, disabled, ...props },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const invalidClassName = invalid ? "is-invalid" : "";
    const loadingClassName = loading ? "is-loading" : "";

    return (
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={`c-select ${invalidClassName} ${loadingClassName} ${className}`.trim()}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";

export default Select;
