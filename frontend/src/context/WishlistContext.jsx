/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  // Get current user's ID
  const userId = user
    ? user.id || user.user_id || user.username
    : null;

  // Every user gets a separate wishlist
  const storageKey = userId
    ? `wishlist_${userId}`
    : null;

  // Used only to make React re-render after localStorage changes
  const [, setVersion] = useState(0);

  /*
   * Get wishlist for the CURRENT user.
   *
   * If nobody is logged in:
   * wishlist = []
   *
   * If a new user logs in:
   * their wishlist is automatically []
   * unless they already had one saved.
   */
  const wishlist = useMemo(() => {
    if (!storageKey) {
      return [];
    }

    const savedWishlist = localStorage.getItem(storageKey);

    if (!savedWishlist) {
      return [];
    }

    try {
      return JSON.parse(savedWishlist);
    } catch (error) {
      console.error("Invalid wishlist data:", error);
      return [];
    }
  }, [storageKey, setVersion]);

  // Add product to wishlist
  const addWishlist = (product) => {
    if (!storageKey) {
      return;
    }

    const currentWishlist = wishlist;

    // Don't add duplicate product
    const alreadyExists = currentWishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      return;
    }

    const updatedWishlist = [
      ...currentWishlist,
      product,
    ];

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedWishlist)
    );

    // Force component update
    setVersion((version) => version + 1);
  };

  // Remove product from wishlist
  const removeWishlist = (id) => {
    if (!storageKey) {
      return;
    }

    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedWishlist)
    );

    setVersion((version) => version + 1);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}