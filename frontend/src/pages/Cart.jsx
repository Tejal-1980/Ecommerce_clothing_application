import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b py-4"
        >
          <div>
            <h3>{item.name}</h3>
            <p>Qty: {item.quantity}</p>
          </div>

          <div>
            ₹{item.price}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 className="text-3xl font-bold mt-6">
        Total: ₹{total}
      </h2>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;