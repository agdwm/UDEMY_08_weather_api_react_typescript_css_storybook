import { clsx } from "clsx";
import { forwardRef } from "react";
import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required = false, children, ...props }, ref) => {
    const labelClasses = clsx("c-label", { "is-required": required }, className);

    return (
      <label
        ref={ref}
        className={labelClasses}
        {...props}
      >
        {children}
        {required && (
          <span className="c-label__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";

export default Label;
