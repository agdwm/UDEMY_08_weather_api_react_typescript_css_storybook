interface LoadingMessageProps {
  message?: string;
}

const LoadingMessage = ({
  message = "Cargando clima...",
}: LoadingMessageProps) => {
  return (
    <div className="c-loading-message" role="status" aria-live="polite">
      <span className="c-loading-message__icon" aria-hidden="true">
        ...
      </span>
      <span>{message}</span>
    </div>
  );
};

export default LoadingMessage;
