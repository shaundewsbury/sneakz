import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ icon, iconRight, title, link }) => {
  return (
    <Link
      className={`flex items-center gap-2 p-4 box-shadow-custom rounded-md bg-white hover:bg-[--color-tertiary] ${
        iconRight && "justify-between flex-row-reverse"
      } `}
      to={link}
    >
      {icon}
      <h3>{title}</h3>
    </Link>
  );
};

export default ItemCard;
