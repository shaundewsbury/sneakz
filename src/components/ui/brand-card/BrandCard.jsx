import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ className, brand, description, link }) => {
  return (
    <Link
      className={`ui-brand-card flex gap-1 flex-col bg-[--color-primary] text-white rounded aspect-[16/9] items-center justify-center ${className}`}
      to={link}
    >
      <h2 className="text-3xl">{brand}</h2>
      {description && <p>{description}</p>}
    </Link>
  );
};

export default BrandCard;
