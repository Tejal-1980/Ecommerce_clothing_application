import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const { addWishlist } =
    useWishlist();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {product.name}
        </h2>

        <p className="text-gray-600 mb-2">
          {product.description}
        </p>

        <p className="text-2xl font-bold mb-4">
          ₹{product.price}
        </p>

        <button
          onClick={() =>
            addToCart(product)
          }
          className="w-full bg-black text-white py-2 rounded mb-2 hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() =>
            addWishlist(product)
          }
          className="w-full border py-2 rounded hover:bg-pink-100 transition"
        >
          ❤️ Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;