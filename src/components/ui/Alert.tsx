import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingMessage from "@/components/ui/LoadingMessage";

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
    <div className="c-alert-region">
      {error ? (
        <ErrorMessage message={error} onDismiss={onDismissError} />
      ) : (
        <LoadingMessage />
      )}
    </div>
  );
};

export default Alert;
