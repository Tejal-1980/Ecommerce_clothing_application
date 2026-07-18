import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [addresses] = useState(() => {
    return JSON.parse(localStorage.getItem("addresses")) || [];
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-10">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Card */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <div className="flex flex-col items-center">

              <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold">
                {user ? user.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 className="text-2xl font-bold mt-5">
                {user || "Guest"}
              </h2>

              <p className="text-gray-500">
                Fashion Store Customer
              </p>

              <button
                onClick={handleLogout}
                className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Logout
              </button>

            </div>

          </div>

          {/* Right */}

          <div className="lg:col-span-2 space-y-8">

            {/* Account */}

            <div className="bg-white rounded-xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Account Information
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="text-gray-500">
                    Username
                  </p>

                  <h3 className="text-xl font-semibold">
                    {user || "Guest"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Account Status
                  </p>

                  <h3 className="text-green-600 font-semibold">
                    Active
                  </h3>
                </div>

              </div>

            </div>

            {/* Addresses */}

            <div className="bg-white rounded-xl shadow-lg p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Saved Addresses
                </h2>

                <button
                  onClick={() => navigate("/address")}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  Manage
                </button>

              </div>

              {addresses.length === 0 ? (

                <div className="text-center py-8">

                  <p className="text-gray-500 mb-5">
                    No address added yet.
                  </p>

                  <button
                    onClick={() => navigate("/address")}
                    className="bg-black text-white px-5 py-2 rounded-lg"
                  >
                    Add Address
                  </button>

                </div>

              ) : (

                <div className="space-y-5">

                  {addresses.map((address, index) => (

                    <div
                      key={index}
                      className="border rounded-lg p-5"
                    >

                      <h3 className="text-lg font-bold">
                        {address.fullName}
                      </h3>

                      <p>{address.phone}</p>

                      <p>{address.address}</p>

                      <p>
                        {address.city}, {address.state}
                      </p>

                      <p>{address.pincode}</p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;