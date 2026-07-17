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
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-2xl">
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

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">

          <div className="overflow-hidden rounded-lg">

            <img
              src={product.image}
              alt={product.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={zoomStyle}
              className="w-full h-[550px] object-cover transition duration-200"
            />

          </div>

          <div>

            <h1 className="text-5xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-gray-500 mb-5">
              {product.description}
            </p>

            <div className="flex gap-4 items-center mb-4">

              <span className="text-4xl font-bold">
                ₹{product.price}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                In Stock
              </span>

            </div>

            <div className="flex items-center gap-2 mb-6">

              <span className="text-yellow-500 text-xl">
                ★★★★☆
              </span>

              <span className="text-gray-500">
                (4.5)
              </span>

            </div>

            <div className="flex items-center gap-5 mb-8">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                className="border px-4 py-2 rounded"
              >
                -
              </button>

              <span className="text-xl">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="border px-4 py-2 rounded"
              >
                +
              </button>

            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Add To Cart
              </button>

              <button
                onClick={() => addWishlist(product)}
                className="border border-pink-500 text-pink-500 px-8 py-3 rounded-lg hover:bg-pink-500 hover:text-white transition"
              >
                ❤️ Wishlist
              </button>

            </div>

            <div className="mt-10 border-t pt-8">

              <h2 className="text-2xl font-semibold mb-4">
                Product Details
              </h2>

              <p className="text-gray-700 leading-8">
                {product.description}
              </p>

            </div>

            <div className="mt-10 border-t pt-8">

              <h2 className="text-2xl font-semibold mb-4">
                Customer Reviews
              </h2>

              <div className="space-y-4">

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">
                    Rahul
                  </h3>

                  <p className="text-yellow-500">
                    ★★★★★
                  </p>

                  <p className="text-gray-600">
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

                  <p className="text-gray-600">
                    Worth the price.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

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
                  className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-4">

                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 line-clamp-2 mt-2">
                      {item.description}
                    </p>

                    <p className="font-bold text-xl mt-3">
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