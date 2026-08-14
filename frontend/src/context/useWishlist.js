import { useContext } from "react";

// useWishlist.js
import { WishlistContext } from "./WishlistContext";
export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}