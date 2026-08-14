import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const { user } = useAuth();
  const { addToCart } = useCart();
  const {
    wishlist,
    addWishlist,
    removeWishlist,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isWishlisted =
    product &&
    wishlist.some((item) => item.id === product.id);

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load product");
        }

        return res.json();
      })
      .then((data) => {
        setProduct(data);

        return fetch(`${BASEURL}/api/products/`);
      })
      .then((res) => res.json())
      .then((products) => {
        setRelatedProducts(products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [BASEURL, id]);

  const requireLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleAddToCart = () => {
    if (!requireLogin()) return;

    if (!selectedSize) {
      alert(
        "Please select a size: Small, Medium, or Large."
      );
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      quantity,
    });

    alert(
      `${product.name} added to cart - Size: ${selectedSize}`
    );
  };

  const handleWishlist = () => {
    if (!requireLogin()) return;

    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6">

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">

          {/* Product Image */}
          <div className="rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">

            <img
              src={product.image}
              alt={product.name}
              className="
                block
                w-full
                h-auto
                object-contain
              "
            />

          </div>

          {/* Product Information */}
          <div className="pt-2">

            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mb-5 leading-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex flex-wrap gap-3 items-center mb-5">

              <span className="text-2xl sm:text-3xl font-bold">
                ₹{product.price}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                In Stock
              </span>

            </div>

            {/* Rating */}
            <div className="flex gap-3 items-center mb-6">

              <span className="text-yellow-500 text-lg">
                ★★★★☆
              </span>

              <span className="text-gray-500 text-sm">
                (4.5)
              </span>

            </div>

            {/* SIZE */}
            <div className="mb-6">

              <p className="font-semibold mb-3">
                Select Size
              </p>

              <div className="flex gap-3">

                {[
                  { value: "S", label: "Small" },
                  { value: "M", label: "Medium" },
                  { value: "L", label: "Large" },
                ].map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() =>
                      setSelectedSize(size.value)
                    }
                    className={`
                      border
                      px-5
                      py-3
                      rounded-lg
                      transition
                      ${selectedSize === size.value
                        ? "bg-black text-white border-black"
                        : "border-gray-400 hover:border-black"
                      }
                    `}
                  >
                    {size.label}
                  </button>
                ))}

              </div>

              {selectedSize && (
                <p className="text-green-600 text-sm mt-2">
                  Selected size: {selectedSize}
                </p>
              )}

            </div>

            {/* Quantity */}
            <div className="flex items-center gap-5 mb-6">

              <span className="font-medium">
                Quantity:
              </span>

              <div className="flex items-center border rounded-lg overflow-hidden">

                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>

                <span className="px-5 py-2 border-x">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleAddToCart}
                className="
                  w-full
                  bg-black
                  text-white
                  px-6
                  py-3
                  rounded-lg
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
                  border
                  px-6
                  py-3
                  rounded-lg
                  transition
                  ${isWishlisted
                    ? "bg-pink-500 text-white border-pink-500"
                    : "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                  }
                `}
              >
                {isWishlisted
                  ? "❤️ Wishlisted"
                  : "♡ Wishlist"}
              </button>

            </div>

            {/* Product Details */}
            <div className="mt-8 border-t pt-6">

              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Product Details
              </h2>

              <p className="text-sm sm:text-base text-gray-700 leading-7">
                {product.description}
              </p>

            </div>

            {/* Reviews */}
            <div className="mt-8 border-t pt-6">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Customer Reviews
              </h2>

              <div className="space-y-3">

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">
                    Rahul
                  </h3>

                  <p className="text-yellow-500">
                    ★★★★★
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Excellent quality product.
                    Highly recommended.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">
                    Sneha
                  </h3>

                  <p className="text-yellow-500">
                    ★★★★☆
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Worth the price.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Related Products */}
        <div className="mt-10 sm:mt-14">

          <h2 className="text-2xl sm:text-3xl font-bold mb-5">
            Related Products
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

            {relatedProducts
              .filter(
                (item) =>
                  item.id !== product.id &&
                  item.category?.id ===
                  product.category?.id
              )
              .slice(0, 4)
              .map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-lg
                    shadow
                    hover:shadow-xl
                    transition
                    overflow-hidden
                  "
                >

                  <div className="bg-gray-100 flex items-center justify-center overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        block
                        w-full
                        h-auto
                        object-contain
                      "
                    />

                  </div>

                  <div className="p-3 sm:p-4">

                    <h3 className="font-semibold text-sm sm:text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-1">
                      {item.description}
                    </p>

                    <p className="font-bold text-base sm:text-xl mt-2">
                      ₹{item.price}
                    </p>

                  </div>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;