import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const navigate = useNavigate();

  const { wishlist, removeWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">
          ❤️ Wishlist
        </h1>

        <p className="text-gray-500 text-lg">
          Your wishlist is empty.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          ❤️ My Wishlist
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {wishlist.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-semibold">
                  {product.name}
                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-2xl font-bold mt-4">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    removeWishlist(product.id)
                  }
                  className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-500 hover:text-white"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;