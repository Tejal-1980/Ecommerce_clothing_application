import {
  createContext,
  useState,
} from "react";

import { useAuth } from "./useAuth";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();

  const userId =
    user?.id ||
    user?.user_id ||
    user?.username ||
    null;

  const storageKey = userId
    ? `cart_${userId}`
    : null;

  const loadCart = () => {
    if (!storageKey) {
      return [];
    }

    try {
      const savedCart =
        localStorage.getItem(storageKey);

      if (!savedCart) {
        return [];
      }

      const parsedCart =
        JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch (error) {
      console.error(
        "Error loading cart:",
        error
      );

      return [];
    }
  };

  return (
    <CartProviderContent
      key={storageKey || "guest"}
      storageKey={storageKey}
      initialCart={loadCart()}
    >
      {children}
    </CartProviderContent>
  );
}

function CartProviderContent({
  children,
  storageKey,
  initialCart,
}) {
  const [cartItems, setCartItems] =
    useState(initialCart);

  const saveCart = (items) => {
    if (!storageKey) {
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(items)
    );
  };

  // product + selected size
  const addToCart = (product, size) => {
    if (!storageKey) {
      return;
    }

    if (!size) {
      return;
    }

    const existingItem =
      cartItems.find(
        (item) =>
          item.id === product.id &&
          item.size === size
      );

    let updatedCart;

    if (existingItem) {
      // Same product + same size
      // Increase quantity
      updatedCart = cartItems.map(
        (item) =>
          item.id === product.id &&
            item.size === size
            ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
            : item
      );
    } else {
      // Same product but different size
      // Create separate cart item
      updatedCart = [
        ...cartItems,
        {
          ...product,
          size,
          quantity: 1,
        },
      ];
    }

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const increaseQuantity = (
    id,
    size
  ) => {
    const updatedCart =
      cartItems.map((item) =>
        item.id === id &&
          item.size === size
          ? {
            ...item,
            quantity:
              item.quantity + 1,
          }
          : item
      );

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const decreaseQuantity = (
    id,
    size
  ) => {
    const updatedCart =
      cartItems
        .map((item) =>
          item.id === id &&
            item.size === size
            ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        );

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const removeFromCart = (
    id,
    size
  ) => {
    const updatedCart =
      cartItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      );

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);

    if (storageKey) {
      localStorage.removeItem(
        storageKey
      );
    }
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