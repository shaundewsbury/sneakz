import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../components/data/products.json";
import { GoHeart, GoHeartFill } from "react-icons/go";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, set } from "firebase/database";
import { useEffect } from "react";

const ProductCard = ({ img, id, brand, description, colour, price }) => {
  const { user } = UserAuth();
  const userID = doc(db, "users", `${user?.email}`);

  // console.log(userID);

  const [liked, setLiked] = useState(false);

  // useEffect(() => {
  //   onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
  //     doc
  //       .data()
  //       .savedProducts?.filter((x) =>
  //         x.id === id ? setLiked(true) : setLiked(false)
  //       );
  //   });
  // }, []);

  const likedButtonClickHandler = async () => {
    if (user?.email) {
      if (!liked) {
        setLiked(!liked);

        await updateDoc(userID, {
          savedProducts: arrayUnion({
            id: id,
          }),
        });
      } else {
        setLiked(!liked);

        await updateDoc(userID, {
          savedProducts: arrayRemove({
            id: id,
          }),
        });
      }
    } else {
      alert("Please log in to save a product");
    }
  };

  return (
    <div className="relative">
      <Link to={`/product/${id}`}>
        <div className="p-3 box-shadow-custom rounded-md bg-white">
          <div
            className="relative rounded-sm aspect-[3/4] mb-2 bg-[--color-secondary]"
            alt=""
          >
            <img
              className="absolute top-0 left-0 w-full h-full object-cover rounded-sm"
              src={img}
            />
          </div>
          <p>{brand}</p>
          <p className="mb-2">
            {description} - {colour}
          </p>
          <p className="font-bold">£{price}</p>
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
