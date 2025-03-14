import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity , size) => {
    if(quantity > 0){
      setCart((prevCart) => [...prevCart, { ...product, quantity,size }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart ,addToCart }}>
      {children}
    </CartContext.Provider>
  );
};