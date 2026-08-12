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

  // Your login response contains user_id
  const userId = user
    ? user.id || user.user_id || user.username
    : null;

  // Every user gets a separate cart
  const storageKey = userId ? `cart_${userId}` : null;

  /*
   * Load cart only for the current user.
   * If nobody is logged in, cart is empty.
   */
  const [cartItems, setCartItems] = useState(() => {
    if (!storageKey) {
      return [];
    }

    const savedCart = localStorage.getItem(storageKey);

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Invalid cart data:", error);
      return [];
    }
  });

  /*
   * When the user changes, we need to load that user's cart.
   *
   * We use a timeout so that we're not calling setState
   * synchronously inside the effect.
   */
  useEffect(() => {
    if (!storageKey) {
      return;
    }

    const timer = setTimeout(() => {
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
    }, 0);

    return () => clearTimeout(timer);
  }, [storageKey]);

  /*
   * Save current user's cart.
   */
  useEffect(() => {
    if (!storageKey) {
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, storageKey]);

  const addToCart = (product) => {
    if (!userId) {
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
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
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
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