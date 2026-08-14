import { useEffect, useState } from "react";
import { CartContext } from "./cart-context";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("cartItems")
        ) || []
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product, size) => {
    const selectedSize = size || product.size;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
            item.size === selectedSize
            ? {
              ...item,
              quantity:
                item.quantity +
                (product.quantity || 1),
            }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          size: selectedSize,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );
  };

  const increaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
          item.size === size
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
          item.id === id &&
            item.size === size
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter(
          (item) => item.quantity > 0
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
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}