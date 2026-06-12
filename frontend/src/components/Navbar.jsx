import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        Fashion Store
      </Link>

      <div className="flex gap-6">
        <Link to="/">
          Home
        </Link>

        <Link to="/cart">
          Cart ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;