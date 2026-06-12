import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { clearCart } = useCart();

  const handlePayment = () => {
    alert("Payment Successful!");

    clearCart();

    navigate("/success");
  };

  return (
    <div className="max-w-xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Checkout
      </h1>

      <p className="mb-6">
        Demo payment system.
      </p>

      <button
        onClick={handlePayment}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;