import React from "react";
import { RiDeleteBin3Fill } from "react-icons/ri";

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
        className="relative rounded-sm aspect-[3/4] w-[6rem] md:w-[8rem] object-cover"
        alt=""
      >
        <img className="rounded-sm" src={item.img} />
      </div>
      <div className="container">
        <div className="productDetails">
          <p className="text-sm">{item.brand}</p>
          <p className="text-sm mb-4">
            {item.description} - {item.color}
          </p>
          <div className="flex justify-between w-full">
            <p className="text-sm font-bold">£{item.price}</p>

            <div className="flex gap-2 items-center">
              <div className="flex items-center bg-[--color-secondary] rounded">
                <button
                  className="w-8 h-8 text-sm font-bold"
                  onClick={() => decreaseBasketQuantity(item.id)}
                >
                  -
                </button>
                <p className="text-sm font-bold">{quantity}</p>
                <button
                  className="w-8 h-8 text-sm font-bold"
                  onClick={() => increaseBasketQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="removeButton"
                onClick={() => removeFromBasket(item.id)}
              >
                <RiDeleteBin3Fill className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketProductCard;
