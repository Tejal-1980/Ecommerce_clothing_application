import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="overflow-hidden">
        <img
          src={
            product.image
              ? `${BASEURL}${product.image}`
              : "https://via.placeholder.com/400x500?text=Fashion"
          }
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;