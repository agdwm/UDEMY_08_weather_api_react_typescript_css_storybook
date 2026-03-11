import { clsx } from "clsx";
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
    const selectClasses = clsx("c-select", { "is-invalid": invalid, "is-loading": loading }, className);

    return (
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={selectClasses}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";

export default Select;
