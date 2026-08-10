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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
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
    setMenuOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">

      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="h-16 flex items-center justify-between gap-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
            aria-label="Open menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap"
          >
            Fashion Store
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-6"
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
              className="bg-black text-white px-5 rounded-r-lg hover:bg-gray-800"
            >
              🔍
            </button>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">

            <Link to="/" className="hover:font-semibold">
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

          {/* Mobile Cart */}
          <Link
            to="/cart"
            className="md:hidden relative text-2xl"
          >
            🛒

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs px-1.5">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>

        {/* ================= MOBILE SEARCH ================= */}
        <form
          onSubmit={handleSearch}
          className="md:hidden flex pb-3"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-l-lg px-3 py-2 outline-none focus:border-black text-sm"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-3 border-y border-gray-300"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className="bg-black text-white px-4 rounded-r-lg"
          >
            🔍
          </button>
        </form>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">

          <div className="px-5 py-4 flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              🏠 Home
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex justify-between"
            >
              <span>❤️ Wishlist</span>

              {wishlist.length > 0 && (
                <span className="bg-red-500 text-white rounded-full text-xs px-2 py-1">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {user && (
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                👤 Profile
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-black text-white text-center py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;