import React from "react";

import { useBasket } from "../context/BasketContext";
import products from "../components/data/products.json";

const BasketProductCard = ({ id, quantity }) => {
  const { decreaseBasketQuantity, increaseBasketQuantity, removeFromBasket } =
    useBasket();

  const item = products.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <div className="flex gap-2 p-3 box-shadow-custom rounded-md bg-white">
      <div
        className="rounded-sm aspect-[3/4] mb-2 bg-[--color-secondary] max-w-[100px]"
        alt=""
      >
        <img className="rounded-sm" src={item.img} />
      </div>
      <div className="container">
        <div className="productDetails">
          <p>{item.brand}</p>
          <p>
            {item.description} - {item.color}
          </p>
          <p className="price">£{item.price}</p>
        </div>

        <div className="productInBasket">
          <div className="controls">
            <div
              className="removeQuantity"
              onClick={() => decreaseBasketQuantity(item.id)}
            >
              -
            </div>
            <div className="quantity">{quantity}</div>
            <div
              className="addQuantity"
              onClick={() => increaseBasketQuantity(item.id)}
            >
              +
            </div>
          </div>
          <div
            className="removeButton"
            onClick={() => removeFromBasket(item.id)}
          >
            X
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketProductCard;
