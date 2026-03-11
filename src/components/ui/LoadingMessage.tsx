import { useIntl } from "react-intl";

interface LoadingMessageProps {
  message?: string;
}

const LoadingMessage = ({ message }: LoadingMessageProps) => {
  const intl = useIntl();

  const resolvedMessage =
    message ??
    intl.formatMessage({
      id: "loading.default",
      defaultMessage: "Loading...",
    });

  return (
    <div className="c-loading-message" role="status" aria-live="polite">
      <span className="c-loading-message__icon" aria-hidden="true">
        ...
      </span>
      <span>{resolvedMessage}</span>
    </div>
  );
};

export default LoadingMessage;
