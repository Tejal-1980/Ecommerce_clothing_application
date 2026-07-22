import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();

  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(keyword)}`);
  };

  const clearSearch = () => {
    setSearch("");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-3xl font-bold"
        >
          Fashion Store
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 mx-10"
        >

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-l-lg px-4 py-2 outline-none focus:border-black"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 border-y border-gray-300 hover:bg-gray-100"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className="bg-black text-white px-6 rounded-r-lg hover:bg-gray-800"
          >
            🔍
          </button>

        </form>

        <div className="flex items-center gap-6">

          <Link to="/">
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
              <Link to="/login">
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