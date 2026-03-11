import { clsx } from "clsx";
import type { ElementType, ReactNode } from "react";

interface CardProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

const Card = ({
  as: Component = "div",
  className = "",
  children,
}: CardProps) => {
  const cardClasses = clsx("c-card", className);

  return (
    <Component className={cardClasses}>{children}</Component>
  );
};

export default Card;
