// ProductCard.jsx

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5">

        <h2 className="text-xl font-semibold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">

          <p className="text-2xl font-bold">
            ₹{product.price}
          </p>

          <span className="text-green-600 font-semibold">
            In Stock
          </span>

        </div>

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full mt-5 border border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          View Details
        </button>

        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add To Cart
        </button>

        <button
          onClick={() => addWishlist(product)}
          className="w-full mt-3 border border-pink-500 text-pink-500 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition"
        >
          ❤️ Wishlist
        </button>

      </div>

    </div>
  );
}

export default ProductCard;