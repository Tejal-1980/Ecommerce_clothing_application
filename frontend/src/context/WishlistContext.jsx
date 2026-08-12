/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  const userId = user
    ? typeof user === "string"
      ? user
      : user.id || user.user_id || user.username
    : null;

  const storageKey = userId
    ? `wishlist_${userId}`
    : null;

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when user changes
  useEffect(() => {
    if (!storageKey) {
      setWishlist([]);
      return;
    }

    const savedWishlist =
      localStorage.getItem(storageKey);

    if (!savedWishlist) {
      setWishlist([]);
      return;
    }

    try {
      setWishlist(JSON.parse(savedWishlist));
    } catch (error) {
      console.error(
        "Invalid wishlist data:",
        error
      );

      setWishlist([]);
    }
  }, [storageKey]);

  // Save wishlist
  useEffect(() => {
    if (!storageKey) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(wishlist)
    );
  }, [wishlist, storageKey]);

  const addWishlist = (product) => {
    if (!storageKey) return;

    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
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