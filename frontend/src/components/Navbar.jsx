import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">
        Fashion Store
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart
        </Link>

        {user ? (
          <>
            <span>
              Welcome, {user}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-500"
            >
              Logout
            </button>
          </>
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