import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";

const ProductCard = ({ imgSrc, id, brand, description, colour, price }) => {
  const [liked, setLiked] = useState(false);

  const likedButtonClickHandler = () => {
    setLiked(!liked);
  };

  return (
    <div className="relative">
      <Link to={`/product/${id}`}>
        <div className="p-4 box-shadow-custom rounded-md bg-white">
          <div className="rounded-sm aspect-[3/4] mb-2 bg-[--color-secondary]">
            <img className="rounded-sm" src={imgSrc} />
          </div>
          <p>{brand}</p>
          <p className="mb-2">
            {description} - {colour}
          </p>
          <p className="font-semibold">£{price}</p>
        </div>
      </Link>
      <button
        className="absolute top-6 right-6"
        as="button"
        onClick={likedButtonClickHandler}
      >
        {liked ? (
          <GoHeartFill className="w-6 h-6" />
        ) : (
          <GoHeart className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
