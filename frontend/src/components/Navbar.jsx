import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const { toggleTheme } =
    useTheme();

  const { wishlist } =
    useWishlist();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-5 shadow">
      <h1 className="text-3xl font-bold">
        Fashion Store
      </h1>

      <div className="space-x-5">
        <Link to="/">Home</Link>

        <Link to="/wishlist">
          ❤️ {wishlist.length}
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <button
          onClick={toggleTheme}
        >
          🌙
        </button>

        {user ? (
          <button
            onClick={handleLogout}
            className="text-red-500"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;