import type { ReactNode } from "react";

interface LoadingProps {
  message?: ReactNode;
  className?: string;
}

const Loading = ({ message = "Cargando...", className }: LoadingProps) => (
  <div
    className={["c-loading-message", className].filter(Boolean).join(" ")}
    role="status"
    aria-live="polite"
  >
    <span className="c-loading-message__spinner" aria-hidden="true">
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" opacity="0.2" />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          strokeDasharray="31.4"
          strokeDashoffset="0"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
    <span className="c-loading-message__text">{message}</span>
  </div>
);

export default Loading;
