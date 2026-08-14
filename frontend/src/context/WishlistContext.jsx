import { useState } from "react";
import { useAuth } from "./useAuth";
import { WishlistContext } from "./wishlist-context";

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  // Your AuthContext stores user as a username string
  const userId = user || null;

  const storageKey = userId
    ? `wishlist_${userId}`
    : null;

  const loadWishlist = () => {
    if (!storageKey) {
      return [];
    }

    try {
      const savedWishlist =
        localStorage.getItem(storageKey);

      if (!savedWishlist) {
        return [];
      }

      const parsedWishlist =
        JSON.parse(savedWishlist);

      return Array.isArray(parsedWishlist)
        ? parsedWishlist
        : [];
    } catch (error) {
      console.error(
        "Error loading wishlist:",
        error
      );

      return [];
    }
  };

  return (
    <WishlistProviderContent
      key={storageKey || "guest"}
      storageKey={storageKey}
      initialWishlist={loadWishlist()}
    >
      {children}
    </WishlistProviderContent>
  );
}

function WishlistProviderContent({
  children,
  storageKey,
  initialWishlist,
}) {
  const [wishlist, setWishlist] =
    useState(initialWishlist);

  const saveWishlist = (items) => {
    if (!storageKey) {
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(items)
    );
  };

  const addWishlist = (product) => {
    if (!storageKey) {
      return;
    }

    const alreadyExists = wishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      return;
    }

    const updatedWishlist = [
      ...wishlist,
      product,
    ];

    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
  };

  const removeWishlist = (id) => {
    const updatedWishlist =
      wishlist.filter(
        (item) => item.id !== id
      );

    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
  };

  const clearWishlist = () => {
    setWishlist([]);

    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}