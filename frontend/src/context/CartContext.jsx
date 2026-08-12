/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  const userId = user
    ? typeof user === "string"
      ? user
      : user.id || user.user_id || user.username
    : null;

  const storageKey = userId ? `cart_${userId}` : null;

  const [cartItems, setCartItems] = useState([]);

  // Load cart whenever user changes
  useEffect(() => {
    if (!storageKey) {
      setCartItems([]);
      return;
    }

    const savedCart = localStorage.getItem(storageKey);

    if (!savedCart) {
      setCartItems([]);
      return;
    }

    try {
      setCartItems(JSON.parse(savedCart));
    } catch (error) {
      console.error("Invalid cart data:", error);
      setCartItems([]);
    }
  }, [storageKey]);

  // Save cart
  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, storageKey]);

  const addToCart = (product) => {
    if (!userId) return;

    if (!product.size) {
      alert("Please select a size.");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
            item.size === product.size
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  const increaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}