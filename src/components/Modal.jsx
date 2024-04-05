import React from "react";

const Modal = ({ active, title, children, className, ...props }) => {
  active && document.querySelector(".content").classList.add("overlay");

  return (
    <div
      className={`${
        active ? "absolute" : "none"
      } translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80vw] h-[80vh] box-shadow-custom ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Modal;
