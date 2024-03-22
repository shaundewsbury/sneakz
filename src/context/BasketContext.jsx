import { createContext, useContext } from "react";

import { useLocalStorage } from "../utils/utils/useLocalStorage";

const BasketContext = createContext({});

export const useBasket = () => {
  return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useLocalStorage("basket", []);

  const getItemQuantity = (id) => {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseBasketQuantity = (id) => {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseBasketQuantity = (id) => {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id).quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromBasket = (id) => {
    setBasketItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const basketQuantity = basketItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <BasketContext.Provider
      value={{
        getItemQuantity,
        increaseBasketQuantity,
        decreaseBasketQuantity,
        removeFromBasket,
        basketItems,
        basketQuantity,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
