import type { ElementType, ReactNode } from "react";

interface CardProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

const Card = ({ as: Component = "div", className = "", children }: CardProps) => {
  return <Component className={`c-card ${className}`.trim()}>{children}</Component>;
};

export default Card;
