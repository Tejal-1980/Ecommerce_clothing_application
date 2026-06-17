import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">
        Fashion Store
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;