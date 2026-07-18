// src/components/Navbar.jsx

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const { wishlist } = useWishlist();

  const { cartItems } = useCart();

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    navigate("/", {
      state: {
        search,
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold"
        >
          Fashion Store
        </Link>

        {/* Search */}

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 mx-10"
        >

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-l-lg px-4 py-2 outline-none"
          />

          <button
            className="bg-black text-white px-6 rounded-r-lg"
          >
            Search
          </button>

        </form>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "font-bold"
                : ""
            }
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            className="relative"
          >
            ❤️

            {wishlist.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                {wishlist.length}
              </span>
            )}

          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            🛒

            {cartItems.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-black text-white rounded-full text-xs px-2">
                {cartItems.length}
              </span>
            )}

          </Link>

          {user && (
            <Link to="/profile">
              Profile
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;