import React from "react";

const Button = ({
  className,
  fullWidth,
  variant,
  text,
  largePadding,
  secondaryVariant,
  ...props
}) => {
  return (
    <button
      className={`py-2 bg-[--color-primary] decorativeText rounded-md border-2 border-[--color-primary] hover:bg-[--color-tertiary] hover:text-[--color-primary] transition-all ${
        fullWidth && "w-full"
      } ${largePadding ? "px-10" : "px-4"} ${
        secondaryVariant
          ? "bg-[--color-secondary] text-[--color-primary]"
          : "bg-[--color-primary] text-white hover:text-[--color-primary]"
      } ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
