
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { clearCart } = useCart();

  const total = location.state?.total || 0;

  const [method, setMethod] = useState("COD");

  const handlePayment = () => {
    clearCart();

    navigate("/success", {
      state: {
        paymentMethod: method,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Payment
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8">
              Choose Payment Method
            </h2>

            <div className="space-y-5">

              <label className="flex items-center justify-between border rounded-lg p-5 cursor-pointer hover:border-black">

                <div>
                  <h3 className="font-semibold">
                    Cash on Delivery
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Pay when your order arrives.
                  </p>
                </div>

                <input
                  type="radio"
                  checked={method === "COD"}
                  onChange={() => setMethod("COD")}
                />

              </label>

              <label className="flex items-center justify-between border rounded-lg p-5 cursor-pointer hover:border-black">

                <div>
                  <h3 className="font-semibold">
                    UPI Payment
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Google Pay • PhonePe • Paytm
                  </p>
                </div>

                <input
                  type="radio"
                  checked={method === "UPI"}
                  onChange={() => setMethod("UPI")}
                />

              </label>

              {method === "UPI" && (

                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  className="w-full border rounded-lg p-3"
                />

              )}

              <label className="flex items-center justify-between border rounded-lg p-5 cursor-pointer hover:border-black">

                <div>
                  <h3 className="font-semibold">
                    Credit / Debit Card
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Visa • MasterCard • RuPay
                  </p>
                </div>

                <input
                  type="radio"
                  checked={method === "CARD"}
                  onChange={() => setMethod("CARD")}
                />

              </label>

              {method === "CARD" && (

                <div className="space-y-4 mt-4">

                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border rounded-lg p-3"
                  />

                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="w-full border rounded-lg p-3"
                  />

                  <div className="grid grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="border rounded-lg p-3"
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      className="border rounded-lg p-3"
                    />

                  </div>

                </div>

              )}

            </div>

          </div>

          <div>

            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Payment Summary
              </h2>

              <div className="flex justify-between mb-5">

                <span>Total Amount</span>

                <span className="font-bold text-2xl">
                  ₹{Number(total).toFixed(2)}
                </span>

              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition"
              >
                Confirm Payment
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;