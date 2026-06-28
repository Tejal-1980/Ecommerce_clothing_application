import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2 className="text-2xl">
          Your cart is empty.
        </h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-4"
            >
              <div>
                <h3 className="font-bold">
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.id
                      )
                    }
                    className="px-3 border"
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.id
                      )
                    }
                    className="px-3 border"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-3xl font-bold mt-6">
            Total: ₹{total.toFixed(2)}
          </h2>

          <button
            onClick={() => {
              if (
                cartItems.length === 0
              ) {
                alert(
                  "Cart is empty."
                );
                return;
              }

              navigate(
                "/checkout"
              );
            }}
            className="mt-6 bg-black text-white px-6 py-3 rounded"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;