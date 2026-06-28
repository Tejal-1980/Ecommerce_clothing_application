import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl">
          Your cart is empty.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        Checkout
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        className="border p-3 w-full mb-4"
      />

      <input
        type="text"
        placeholder="Phone Number"
        className="border p-3 w-full mb-4"
      />

      <input
        type="text"
        placeholder="Address"
        className="border p-3 w-full mb-4"
      />

      <button
        onClick={() =>
          navigate("/payment")
        }
        className="bg-black text-white px-6 py-3 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Checkout;