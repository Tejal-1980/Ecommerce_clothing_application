// src/pages/Address.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState(() => {
    return JSON.parse(localStorage.getItem("addresses")) || [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
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

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setEditingIndex(null);
  };

  const saveAddress = () => {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = form;

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      alert("Please fill all fields.");
      return;
    }

    let updated = [...addresses];

    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }

    setAddresses(updated);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updated)
    );

    resetForm();

    alert("Address Saved Successfully");
  };

  const editAddress = (index) => {
    setEditingIndex(index);

    setForm(addresses[index]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteAddress = (index) => {
    if (!window.confirm("Delete this address?"))
      return;

    const updated = addresses.filter(
      (_, i) => i !== index
    );

    setAddresses(updated);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Manage Addresses
          </h1>

          <button
            onClick={() => navigate("/profile")}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Back
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* FORM */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">

              {editingIndex !== null
                ? "Edit Address"
                : "Add Address"}

            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                rows="4"
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <button
                onClick={saveAddress}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                {editingIndex !== null
                  ? "Update Address"
                  : "Save Address"}
              </button>

              {editingIndex !== null && (
                <button
                  onClick={resetForm}
                  className="w-full border py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}

            </div>

          </div>

          {/* ADDRESS LIST */}

          <div className="space-y-5">

            {addresses.length === 0 ? (

              <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                <h2 className="text-2xl font-bold">
                  No Address Added
                </h2>

                <p className="text-gray-500 mt-3">
                  Add your first delivery address.
                </p>

              </div>

            ) : (

              addresses.map((item, index) => (

                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <h3 className="text-xl font-bold">
                    {item.fullName}
                  </h3>

                  <p className="mt-2">
                    {item.phone}
                  </p>

                  <p className="mt-2">
                    {item.address}
                  </p>

                  <p className="mt-2">
                    {item.city}, {item.state}
                  </p>

                  <p>{item.pincode}</p>

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() =>
                        editAddress(index)
                      }
                      className="bg-blue-500 text-white px-5 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteAddress(index)
                      }
                      className="bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Address;