import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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

        <p className="text-xl font-bold mb-4">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;