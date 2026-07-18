// src/pages/Checkout.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key].trim()) {
        alert("Please fill all fields.");
        return;
      }
    }

    navigate("/payment", {
      state: {
        address: form,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8"
          >

            <h2 className="text-2xl font-bold mb-8">
              Shipping Address
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />

              <textarea
                name="address"
                placeholder="Address"
                rows="4"
                value={form.address}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

            </div>

            <button
              type="submit"
              className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Continue to Payment
            </button>

          </form>

          <div>

            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;