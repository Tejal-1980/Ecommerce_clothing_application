import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Payment() {
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
        Payment
      </h1>

      <p className="mb-6">
        Select Payment Method
      </p>

      <div className="space-y-3 mb-6">
        <div>
          <input type="radio" name="payment" />
          <span className="ml-2">UPI</span>
        </div>

        <div>
          <input type="radio" name="payment" />
          <span className="ml-2">
            Credit/Debit Card
          </span>
        </div>

        <div>
          <input type="radio" name="payment" />
          <span className="ml-2">
            Cash on Delivery
          </span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;