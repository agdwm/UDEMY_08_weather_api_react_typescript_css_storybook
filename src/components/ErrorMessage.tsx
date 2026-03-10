import { useEffect, useRef } from "react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
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
        <button
          className="c-error-message__dismiss u-focus-ring"
          onClick={onDismiss}
          aria-label={`Cerrar error: ${message}`}
          type="button"
        >
          x
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
