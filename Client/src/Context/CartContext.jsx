import { createContext, useState, useContext } from "react";
import products from "../products";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size) => {
    if (quantity > 0) {
      setCart((prevCart) => {
        // Find the existing product based on `name` and `size`
        const existingPrIndex = prevCart.findIndex(
          (item) => item.name === product.name && item.size === size
        );
  
        if (existingPrIndex !== -1) {
          // If found, update the quantity
          return prevCart.map((item, index) =>
            index === existingPrIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // If not found, add as a new item
          return [...prevCart, { ...product, quantity, size }];
        }
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart ,addToCart }}>
      {children}
    </CartContext.Provider>
  );
};