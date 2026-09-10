import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Context = createContext();

export const CartDataProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item;
        });
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (product, qty) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => {
          return item.id === product.id ? { ...item, quantity: qty } : item;
        });
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  const getItemQuantity = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (!exists) return 0;
    return exists.quantity;
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const deleteItem = (product) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        addToCart,
        cartCount,
        updateQuantity,
        getItemQuantity,
        getTotal,
        deleteItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartData = () => useContext(Context);
