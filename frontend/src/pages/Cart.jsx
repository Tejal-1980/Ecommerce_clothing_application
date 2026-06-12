import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  <Link
    to="/checkout"
    className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
  >
    Proceed to Payment
  </Link>
  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between border-b py-4"
            >
              <div>
                <h2>{item.name}</h2>

                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <div>
                ₹{item.price * item.quantity}

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-6">
            Total: ₹{total}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;