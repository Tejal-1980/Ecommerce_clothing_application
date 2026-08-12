import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addWishlist } = useWishlist();

  const requireLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleProductClick = () => {
    if (requireLogin()) {
      navigate(`/product/${product.id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!requireLogin()) return;

    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (!requireLogin()) return;

    addWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-200">

      {/* Product Image */}
      <div
        onClick={handleProductClick}
        className="cursor-pointer bg-gray-50 aspect-square overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-contain
            hover:scale-105
            transition
            duration-300
          "
        />
      </div>

      {/* Product Information */}
      <div className="p-2 sm:p-3 md:p-4">

        {/* Product Name */}
        <h2 className="text-sm sm:text-base md:text-lg font-semibold truncate">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="flex justify-between items-center mt-2">

          <p className="text-sm sm:text-base md:text-xl font-bold">
            ₹{product.price}
          </p>

          <span className="text-[10px] sm:text-xs md:text-sm text-green-600 font-semibold">
            In Stock
          </span>

        </div>

        {/* View Details */}
        <button
          onClick={handleProductClick}
          className="
            w-full
            mt-2
            border border-black
            py-1.5 sm:py-2
            rounded-md
            text-[11px] sm:text-xs md:text-sm
            hover:bg-black
            hover:text-white
            transition
          "
        >
          View Details
        </button>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className="
            w-full
            mt-1.5
            bg-black
            text-white
            py-1.5 sm:py-2
            rounded-md
            text-[11px] sm:text-xs md:text-sm
            hover:bg-gray-800
            transition
          "
        >
          Add To Cart
        </button>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="
            w-full
            mt-1.5
            border border-pink-400
            text-pink-500
            py-1.5 sm:py-2
            rounded-md
            text-[11px] sm:text-xs md:text-sm
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