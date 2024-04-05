import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiDeleteBin3Fill } from "react-icons/ri";

import { useBasket } from "../context/BasketContext";
import products from "../components/data/products.json";

import Main from "../components/layout/Main";
import Button from "../components/Button";

const Product = () => {
  const { productID } = useParams();

  const { id, img, brand, description, fullDescription, price } = products.find(
    (prod) => prod.id == productID
  );

  const {
    getItemQuantity,
    increaseBasketQuantity,
    decreaseBasketQuantity,
    removeFromBasket,
  } = useBasket();

  const quantity = getItemQuantity(id);

  return (
    <Main>
      <div className="grid grid-cols-12 gap-4 p-4 box-shadow-custom rounded-md bg-white">
        <div className="col-span-12 md:col-span-5">
          <div className="rounded-sm aspect-[3/4] mb-2 bg-[--color-secondary]">
            <img className="rounded-sm" src={img} alt="" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <h1 className="text-lg md:text-2xl mb-1">{brand}</h1>
          <h2 className="text-lg md:text-2xl mb-2">{description}</h2>
          <p className="mb-2">{fullDescription}</p>
          <p className="text-lg md:text-2xl font-bold mb-4">£{price}</p>
          {quantity === 0 ? (
            <Button
              className="w-full md:w-auto"
              text="Add to Basket"
              largePadding
              onClick={() => increaseBasketQuantity(id)}
            />
          ) : (
            <div className="flex gap-2 items-center">
              <div className="flex items-center bg-[--color-secondary] rounded">
                <button
                  className="w-8 h-8 font-bold"
                  onClick={() => decreaseBasketQuantity(id)}
                >
                  -
                </button>
                <p className="font-bold">{quantity}</p>
                <button
                  className="w-8 h-8 font-bold"
                  onClick={() => increaseBasketQuantity(id)}
                >
                  +
                </button>
              </div>
              <button
                className="removeButton"
                onClick={() => removeFromBasket(id)}
              >
                <RiDeleteBin3Fill className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default Product;
