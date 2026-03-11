import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SwitchProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "role" | "aria-checked" | "children"
  > {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onIcon?: ReactNode;
  offIcon?: ReactNode;
  screenReaderLabel?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      onClick,
      className = "",
      type = "button",
      onIcon,
      offIcon,
      screenReaderLabel,
      ...props
    },
    ref,
  ) => {
    const checkedClassName = checked ? "is-checked" : "";

    const handleClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = (
      event,
    ) => {
      onClick?.(event);

      if (!event.defaultPrevented) {
        onCheckedChange?.(!checked);
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={checked}
        className={`c-switch ${checkedClassName} ${className}`.trim()}
        onClick={handleClick}
        {...props}
      >
        <span className="c-switch__thumb" aria-hidden="true">
          {checked ? onIcon : offIcon}
        </span>
        {screenReaderLabel && (
          <span className="u-visually-hidden">{screenReaderLabel}</span>
        )}
      </button>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
