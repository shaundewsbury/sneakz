import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import products from "../components/data/products.json";

import Main from "../components/layout/Main";
import Button from "../components/Button";

const Product = () => {
  const { productID } = useParams();

  const {
    getItemQuantity,
    increaseBasketQuantity,
    decreaseBasketQuantity,
    removeFromBasket,
  } = useBasket();
  const quantity = getItemQuantity(productID);

  const product = products.find((prod) => prod.id == productID);

  return (
    <Main>
      <div className="grid grid-cols-12 gap-4 p-4 box-shadow-custom rounded-md bg-white">
        <div className="col-span-12 md:col-span-4 p-4">
          <div className="rounded-sm aspect-[3/4] mb-2 bg-[--color-secondary]">
            <img className="rounded-sm" src={product.img} alt="" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 p-4">
          <h1 className="mb-1">{product.brand}</h1>
          <h2 className="mb-2">{product.description}</h2>
          <p className="mb-2">{product.fullDescription}</p>
          <p className="mb-4">£{product.price}</p>
          {quantity === 0 ? (
            <div
              className="addToBasketButton"
              onClick={() => increaseBasketQuantity(product.id)}
            >
              Add to Basket
            </div>
          ) : (
            <div className="productInBasket">
              <div className="controls">
                <div
                  className="removeQuantity"
                  onClick={() => decreaseBasketQuantity(product.id)}
                >
                  -
                </div>
                <div className="quantity">{quantity}</div>
                <div
                  className="addQuantity"
                  onClick={() => increaseBasketQuantity(product.id)}
                >
                  +
                </div>
              </div>
              <div
                className="removeButton"
                onClick={() => removeFromBasket(product.id)}
              >
                X
              </div>
            </div>
          )}
          <Button
            text="Add to Basket"
            onClick={() => increaseBasketQuantity(product.id)}
          />
        </div>
      </div>
    </Main>
  );
};

export default Product;
