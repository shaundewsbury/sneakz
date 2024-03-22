import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const accordionClickHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion mb-5 lg:mb-8">
      <button
        className="flex gap-2 items-center"
        onClick={accordionClickHandler}
      >
        <h1 className="text-2xl md:text-3xl">{title}</h1>
        <MdChevronRight
          className={`${
            isActive ? "rotate-[-90deg]" : "rotate-90"
          } transition-all`}
        />
      </button>
      <div className={`${isActive ? "block mt-2" : "hidden"}`}>{content}</div>
    </div>
  );
};

export default Accordion;
