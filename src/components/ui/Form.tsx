import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  children: ReactNode;
}

const Form = ({ children, className = "", ...props }: FormProps) => {
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
};

export default Form;
