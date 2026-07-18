// src/pages/Success.jsx

import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentMethod = location.state?.paymentMethod || "COD";
  const total = Number(location.state?.total || 0);

  // Later replace this with the real order ID from your backend
  const orderId = location.state?.orderId || "FS-100001";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-10">

        <div className="text-center">

          <div className="text-7xl mb-6">🎉</div>

          <h1 className="text-4xl font-bold">
            Order Placed Successfully
          </h1>

          <p className="text-gray-500 mt-4">
            Thank you for shopping with Fashion Store.
          </p>

        </div>

        <div className="mt-10 bg-gray-50 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-semibold">{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold">{paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status</span>
              <span className="text-green-600 font-semibold">
                Successful
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid</span>
              <span className="text-2xl font-bold">
                ₹{total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-10">

          <button
            onClick={() => navigate("/")}
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="border border-black py-3 rounded-lg hover:bg-black hover:text-white"
          >
            My Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Success;