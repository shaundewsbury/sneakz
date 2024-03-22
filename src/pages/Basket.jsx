import React from "react";
import products from "../components/data/products.json";
import { useBasket } from "../context/BasketContext";
import BasketProductCard from "../components/BasketProductCard";
import Main from "../components/layout/Main";
import Button from "../components/Button";
const Basket = () => {
  const { basketItems } = useBasket();

  const itemDeliveryCharge = 5;

  const productTotal = basketItems.reduce((total, basketItem) => {
    const item = products.find((i) => i.id === basketItem.id);
    return total + item.price * basketItem.quantity;
  }, 0);

  const deliveryTotal = basketItems.reduce((total, basketItem) => {
    products.find((i) => i.id === basketItem.id);
    return total + itemDeliveryCharge * basketItem.quantity;
  }, 0);

  return (
    <Main>
      <h1>Basket</h1>
      <div className="grid grid-cols-12 gap-4 mb-12">
        {basketItems.length > 0 ? (
          <>
            <div className="col-span-12 md:col-span-6 flex gap-4 flex-col">
              {basketItems.map((item) => (
                <BasketProductCard key={item.id} {...item} />
              ))}
            </div>

            <div className="col-span-12 md:col-span-6 p-4 box-shadow-custom rounded-md bg-white">
              <h3 className="mb-4">Order Summary</h3>
              <hr className="w-full border-[--color-secondary] border my-4" />
              <div className="flex justify-between mb-4">
                <p>Order</p>
                <p>£{productTotal}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Delivery</p>
                <p>£{deliveryTotal}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Total</p>
                <p>£{productTotal + deliveryTotal}</p>
              </div>
              <Button text="Proceed to Checkout" />
            </div>
          </>
        ) : (
          <div className="emptyBasket">
            <p>No items currently in your basket.</p>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Basket;
