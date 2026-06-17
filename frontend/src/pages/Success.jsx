import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="text-center mt-32">
      <h1 className="text-5xl font-bold text-green-600">
        Order Placed Successfully!
      </h1>

      <p className="mt-4">
        Thank you for shopping with us.
      </p>

      <Link
        to="/"
        className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success;