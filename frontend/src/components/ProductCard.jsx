import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import { useAuth } from "../context/useAuth";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { addToCart } = useCart();

  const {
    wishlist,
    addWishlist,
    removeWishlist,
  } = useWishlist();

  const [selectedSize, setSelectedSize] =
    useState("");

  const isWishlisted =
    wishlist.some(
      (item) =>
        item.id === product.id
    );

  const requireLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleProductClick = () => {
    if (requireLogin()) {
      navigate(
        `/product/${product.id}`
      );
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!requireLogin()) {
      return;
    }

    if (!selectedSize) {
      alert(
        "Please select a size: Small, Medium, or Large."
      );
      return;
    }

    // IMPORTANT:
    // product and size are separate arguments
    addToCart(
      product,
      selectedSize
    );

    alert(
      `Added to cart - Size: ${selectedSize}`
    );
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (!requireLogin()) {
      return;
    }

    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-lg
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition
        border
        border-gray-200
        flex
        flex-col
        h-full
      "
    >

      {/* IMAGE */}
      <div
        onClick={handleProductClick}
        className="
          cursor-pointer
          w-full
          aspect-[4/5]
          bg-gray-100
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="
            w-full
            h-full
            object-contain
            block
          "
        />
      </div>

      {/* PRODUCT INFORMATION */}
      <div
        className="
          p-2
          sm:p-3
          md:p-4
          flex
          flex-col
          flex-1
        "
      >

        <h2
          className="
            text-sm
            sm:text-base
            md:text-lg
            font-semibold
          "
        >
          {product.name}
        </h2>

        <p
          className="
            text-[11px]
            sm:text-xs
            md:text-sm
            text-gray-500
            mt-1
            line-clamp-2
          "
        >
          {product.description}
        </p>

        {/* PRICE */}
        <div
          className="
            flex
            justify-between
            items-center
            mt-2
          "
        >
          <p
            className="
              text-sm
              sm:text-base
              md:text-xl
              font-bold
            "
          >
            ₹{product.price}
          </p>

          <span
            className="
              text-[10px]
              sm:text-xs
              md:text-sm
              text-green-600
              font-semibold
            "
          >
            In Stock
          </span>
        </div>

        {/* SIZE */}
        <div className="mt-3">

          <p
            className="
              text-xs
              sm:text-sm
              font-semibold
              mb-2
            "
          >
            Select Size
          </p>

          <div
            className="
              grid
              grid-cols-3
              gap-1.5
            "
          >
            {["S", "M", "L"].map(
              (size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedSize(
                      size
                    );
                  }}
                  className={`
                    border
                    py-1.5
                    rounded
                    text-xs
                    sm:text-sm
                    transition
                    ${selectedSize ===
                      size
                      ? "bg-black text-white border-black"
                      : "border-gray-400 hover:border-black"
                    }
                  `}
                >
                  {size}
                </button>
              )
            )}
          </div>

          {selectedSize && (
            <p
              className="
                text-xs
                text-green-600
                mt-1
              "
            >
              Size {selectedSize} selected
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div
          className="
            mt-auto
            pt-3
          "
        >

          <button
            onClick={handleProductClick}
            className="
              w-full
              border
              border-black
              py-1.5
              sm:py-2
              rounded-md
              text-[11px]
              sm:text-xs
              md:text-sm
              hover:bg-black
              hover:text-white
              transition
            "
          >
            View Details
          </button>

          <button
            onClick={handleAddToCart}
            className="
              w-full
              mt-1.5
              bg-black
              text-white
              py-1.5
              sm:py-2
              rounded-md
              text-[11px]
              sm:text-xs
              md:text-sm
              hover:bg-gray-800
              transition
            "
          >
            Add To Cart
          </button>

          <button
            onClick={handleWishlist}
            className={`
              w-full
              mt-1.5
              border
              py-1.5
              sm:py-2
              rounded-md
              text-[11px]
              sm:text-xs
              md:text-sm
              transition
              ${isWishlisted
                ? "bg-pink-500 text-white border-pink-500"
                : "border-pink-400 text-pink-500 hover:bg-pink-500 hover:text-white"
              }
            `}
          >
            {isWishlisted
              ? "❤️ Wishlisted"
              : "♡ Wishlist"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;