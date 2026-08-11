import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const { addToCart } = useCart();
  const { addWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center",
    transform: "scale(1)",
  });

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

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center",
      transform: "scale(1)",
    });
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

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6">

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">

          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-gray-100">

            <img
              src={product.image}
              alt={product.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={zoomStyle}
              className="
                w-full
                h-[380px]
                sm:h-[450px]
                lg:h-[550px]
                object-cover
                transition duration-200
              "
            />

          </div>

          {/* Product Information */}
          <div className="pt-2">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mb-5 leading-6">
              {product.description}
            </p>

            {/* Price + Stock */}
            <div className="flex flex-wrap gap-3 items-center mb-4">

              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                ₹{product.price}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                In Stock
              </span>

            </div>

            {/* Rating */}
            <div className="flex gap-3 items-center mb-6">

              <span className="text-yellow-500 text-lg sm:text-xl">
                ★★★★☆
              </span>

              <span className="text-gray-500 text-sm">
                (4.5)
              </span>

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
                  sm:w-auto
                  flex-1
                  bg-black
                  text-white
                  px-6
                  sm:px-8
                  py-3
                  rounded-lg
                  hover:bg-gray-800
                  transition
                "
              >
                Add To Cart
              </button>

              <button
                onClick={() => addWishlist(product)}
                className="
                  w-full
                  sm:w-auto
                  flex-1
                  border
                  border-pink-500
                  text-pink-500
                  px-6
                  sm:px-8
                  py-3
                  rounded-lg
                  hover:bg-pink-500
                  hover:text-white
                  transition
                "
              >
                ❤️ Wishlist
              </button>

            </div>

            {/* Product Details */}
            <div className="mt-8 sm:mt-10 border-t pt-6 sm:pt-8">

              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Product Details
              </h2>

              <p className="text-sm sm:text-base text-gray-700 leading-7">
                {product.description}
              </p>

            </div>

            {/* Reviews */}
            <div className="mt-8 sm:mt-10 border-t pt-6 sm:pt-8">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Customer Reviews
              </h2>

              <div className="space-y-3">

                <div className="border rounded-lg p-3 sm:p-4">

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

                <div className="border rounded-lg p-3 sm:p-4">

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

          <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">
            Related Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">

            {relatedProducts
              .filter(
                (item) =>
                  item.id !== product.id &&
                  item.category.id === product.category.id
              )
              .slice(0, 4)
              .map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-lg
                    sm:rounded-xl
                    shadow
                    hover:shadow-xl
                    transition
                    overflow-hidden
                  "
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-40
                      sm:h-56
                      w-full
                      object-cover
                    "
                  />

                  <div className="p-3 sm:p-4">

                    <h3 className="font-semibold text-sm sm:text-lg truncate">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-1 sm:mt-2">
                      {item.description}
                    </p>

                    <p className="font-bold text-base sm:text-xl mt-2 sm:mt-3">
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