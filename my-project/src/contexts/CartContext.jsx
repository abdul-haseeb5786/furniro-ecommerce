  import React, { createContext, useContext, useState, useEffect } from 'react';

  const CartContext = createContext();

  export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); // Manage cart open state

    useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);
        if (existingItem) {
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        }
        return [...prevItems, item];
      });
      setIsCartOpen(true); // Automatically open the cart when item is added
    };

    const removeFromCart = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const getCartTotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          getCartTotal,
          isCartOpen,
          setIsCartOpen, // Make setIsCartOpen accessible
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };
