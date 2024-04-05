import React from "react";

const Button = ({
  className,
  fullWidth,
  variant,
  text,
  largePadding,
  ...props
}) => {
  return (
    <button
      className={`py-2 bg-[--color-primary] decorativeText text-white rounded-md border-2 border-[--color-primary] hover:bg-[--color-secondary] hover:text-[--color-primary] transition-all ${
        fullWidth && "w-full"
      } ${largePadding ? "px-10" : "px-4"} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
