import Button from "@/components/ui/Button";
import { useEffect, useRef } from "react";
import { useIntl } from "react-intl";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  const intl = useIntl();
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    alertRef.current?.focus();
  }, [message]);

  return (
    <div
      ref={alertRef}
      className="c-error-message"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      tabIndex={-1}
    >
      <div className="c-error-message__content">
        <span className="c-error-message__icon" aria-hidden="true">
          !
        </span>
        <p className="c-error-message__text">{message}</p>
      </div>
      {onDismiss && (
        <Button
          className="c-error-message__dismiss u-focus-ring"
          onClick={onDismiss}
          aria-label={intl.formatMessage(
            {
              id: "error.dismiss",
              defaultMessage: "Dismiss error: {message}",
            },
            { message },
          )}
          type="button"
        >
          x
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
