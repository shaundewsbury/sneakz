import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const ProductCard = ({ imgSrc, id, brand, description, colour, price }) => {
  const { user } = UserAuth();
  const userID = doc(db, "users", `${user?.email}`);

  console.log(userID);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      doc
        .data()
        .savedProducts.map((x) =>
          x.id === id ? setLiked(true) : setLiked(false)
        );
    });
  }, [id]);

  const likedButtonClickHandler = async () => {
    if (user?.email) {
      setLiked(!liked);
      await updateDoc(userID, {
        savedProducts: arrayUnion({
          id: id,
          brand: brand,
          img: imgSrc,
        }),
      });
    } else {
      alert("Please log in to save a product");
    }
  };

  return (
    <div className="relative">
      <Link to={`/product/${id}`}>
        <div className="p-3 box-shadow-custom rounded-md bg-white">
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
