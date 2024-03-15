import React from "react";

const HeroBanner = ({ ...props }) => {
  return (
    <div
      className="flex px-4 py-20 items-center justify-center w-full bg-[--color-primary] text-white mb-8"
      {...props}
    >
      <h2 className="text-5xl">Hero Banner</h2>
    </div>
  );
};

export default HeroBanner;
