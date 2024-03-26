import React from "react";

const Button = ({ className, fullWidth, variant, text, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-[--color-primary] decorativeText text-white rounded-md border-2 border-[--color-primary] hover:bg-[--color-secondary] hover:text-[--color-primary] transition-all ${
        fullWidth && "w-full"
      } ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
