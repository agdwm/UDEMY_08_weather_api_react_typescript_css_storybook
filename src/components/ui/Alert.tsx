import type { ReactNode } from "react";
import { useIntl } from "react-intl";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  {
    icon: ReactNode;
    colorClass: string;
    role: "alert" | "status";
    ariaLive: "assertive" | "polite";
  }
> = {
  info: {
    icon: (
      <svg
        aria-hidden="true"
        width="1.25em"
        height="1.25em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="8" />
      </svg>
    ),
    colorClass: "c-alert--info",
    role: "status",
    ariaLive: "polite",
  },
  success: {
    icon: (
      <svg
        aria-hidden="true"
        width="1.25em"
        height="1.25em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 12 15 16 10" />
      </svg>
    ),
    colorClass: "c-alert--success",
    role: "status",
    ariaLive: "polite",
  },
  warning: {
    icon: (
      <svg
        aria-hidden="true"
        width="1.25em"
        height="1.25em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
    ),
    colorClass: "c-alert--warning",
    role: "alert",
    ariaLive: "assertive",
  },
  error: {
    icon: (
      <svg
        aria-hidden="true"
        width="1.25em"
        height="1.25em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    colorClass: "c-alert--error",
    role: "alert",
    ariaLive: "assertive",
  },
};

export const Alert = ({
  variant,
  title,
  children,
  onDismiss,
  className,
}: AlertProps) => {
  const { icon, colorClass, role, ariaLive } = variantConfig[variant];
  const intl = useIntl();

  return (
    <div
      className={["c-alert", colorClass, className].filter(Boolean).join(" ")}
      role={role}
      aria-live={ariaLive}
    >
      <span className="c-alert__icon">{icon}</span>
      <div className="c-alert__content">
        {title && <strong className="c-alert__title">{title}</strong>}
        <span className="c-alert__message">{children}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="c-alert__close"
          aria-label={intl.formatMessage({ id: "alert.close", defaultMessage: "Close alert" })}
          onClick={onDismiss}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="6" y1="6" x2="14" y2="14" />
            <line x1="14" y1="6" x2="6" y2="14" />
          </svg>
        </button>
      )}
    </div>
  );
};
};

export default Alert;
