import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useWishlist } from "../context/useWishlist";
import { useCart } from "../context/useCart";

function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlist,
    removeWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] =
    useState({});

  const handleAddToCart = (product) => {
    const size =
      selectedSizes[product.id];

    if (!size) {
      alert(
        "Please select a size: Small, Medium, or Large."
      );
      return;
    }

    // IMPORTANT
    addToCart(product, size);

    alert(
      `Added to cart - Size: ${size}`
    );
  };

  if (wishlist.length === 0) {
    return (
      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          px-4
        "
      >

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            mb-4
          "
        >
          ❤️ Wishlist
        </h1>

        <p className="text-gray-500">
          Your wishlist is empty.
        </p>

        <button
          onClick={() =>
            navigate("/")
          }
          className="
            mt-8
            bg-black
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        py-5
        sm:py-10
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-3
          sm:px-6
        "
      >

        <h1
          className="
            text-2xl
            sm:text-4xl
            font-bold
            mb-6
            sm:mb-10
          "
        >
          ❤️ My Wishlist
        </h1>

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            sm:gap-6
          "
        >

          {wishlist.map(
            (product) => (

              <div
                key={product.id}
                className="
                  bg-white
                  rounded-xl
                  shadow
                  overflow-hidden
                  flex
                  flex-col
                "
              >

                {/* IMAGE */}

                <div
                  className="
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
                    className="
                      w-full
                      h-full
                      object-contain
                      block
                    "
                  />

                </div>

                {/* INFO */}

                <div
                  className="
                    p-3
                    sm:p-5
                  "
                >

                  <h2
                    className="
                      text-sm
                      sm:text-xl
                      font-semibold
                    "
                  >
                    {product.name}
                  </h2>

                  <p
                    className="
                      text-gray-500
                      mt-2
                      text-xs
                      sm:text-sm
                      line-clamp-2
                    "
                  >
                    {product.description}
                  </p>

                  <p
                    className="
                      text-lg
                      sm:text-2xl
                      font-bold
                      mt-3
                    "
                  >
                    ₹{product.price}
                  </p>

                  {/* SIZE */}

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      font-semibold
                      mt-4
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
                          onClick={() =>
                            setSelectedSizes(
                              (prev) => ({
                                ...prev,
                                [product.id]:
                                  size,
                              })
                            )
                          }
                          className={`
                            border
                            py-1.5
                            rounded
                            text-xs
                            sm:text-sm
                            ${selectedSizes[
                              product.id
                            ] === size
                              ? "bg-black text-white border-black"
                              : "border-gray-400"
                            }
                          `}
                        >
                          {size}
                        </button>

                      )
                    )}

                  </div>

                  {/* ADD TO CART */}

                  <button
                    onClick={() =>
                      handleAddToCart(
                        product
                      )
                    }
                    className="
                      w-full
                      mt-4
                      bg-black
                      text-white
                      py-2
                      sm:py-3
                      rounded-lg
                      text-xs
                      sm:text-base
                    "
                  >
                    Add To Cart
                  </button>

                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      removeWishlist(
                        product.id
                      )
                    }
                    className="
                      w-full
                      mt-2
                      border
                      border-red-500
                      text-red-500
                      py-2
                      sm:py-3
                      rounded-lg
                      text-xs
                      sm:text-base
                    "
                  >
                    Remove
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;