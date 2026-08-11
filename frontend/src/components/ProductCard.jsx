import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addWishlist } = useWishlist();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  const handleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">

      {/* Product Image */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-40
            sm:h-56
            lg:h-72
            object-cover
            hover:scale-105
            transition
            duration-300
          "
        />
      </div>

      {/* Product Information */}
      <div className="p-2.5 sm:p-4">

        {/* Product Name */}
        <h2 className="text-sm sm:text-lg font-semibold truncate">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="flex justify-between items-center mt-2 sm:mt-3">

          <p className="text-sm sm:text-xl font-bold">
            ₹{product.price}
          </p>

          <span className="hidden sm:block text-xs sm:text-sm text-green-600 font-semibold">
            In Stock
          </span>

        </div>

        {/* View Details */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="
            w-full
            mt-2 sm:mt-3
            border border-black
            py-1.5 sm:py-2
            rounded-md
            text-xs sm:text-sm
            hover:bg-black
            hover:text-white
            transition
          "
        >
          View Details
        </button>

        {/* Add To Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="
            w-full
            mt-1.5 sm:mt-2
            bg-black
            text-white
            py-1.5 sm:py-2
            rounded-md
            text-xs sm:text-sm
            hover:bg-gray-800
            transition
          "
        >
          Add To Cart
        </button>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
          className="
            w-full
            mt-1.5 sm:mt-2
            border border-pink-500
            text-pink-500
            py-1.5 sm:py-2
            rounded-md
            text-xs sm:text-sm
            hover:bg-pink-500
            hover:text-white
            transition
          "
        >
          ❤️ Wishlist
        </button>

      </div>
    </div>
  );
}

export default ProductCard;