import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  title: string;
  onClick: () => void;
  className: string;
}

export default function Button({
  title,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
}
