import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

interface AlertProps {
  error: string | null;
  isPending: boolean;
  onDismissError?: () => void;
}

const Alert = ({ error, isPending, onDismissError }: AlertProps) => {
  if (!error && !isPending) {
    return null;
  }

  return (
    <div
      className="c-alert-region"
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      {error ? (
        <ErrorMessage message={error} onDismiss={onDismissError} />
      ) : (
        <LoadingMessage />
      )}
    </div>
  );
};

export default Alert;
