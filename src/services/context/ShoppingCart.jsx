import React, { createContext, useContext, useState } from "react";

const ShoppingCart = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCart);
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  const increaseItem = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem
      )
    );
  };

  const decreaseItem = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id && prevItem.quantity > 1
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
  };

  const removeItem = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  return (
    <ShoppingCart.Provider
      value={{ cartItems, addToCart, increaseItem, decreaseItem, removeItem }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};
