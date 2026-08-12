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

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10">

      <div className="max-w-7xl mx-auto px-3 sm:px-6">

        <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-10">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 sm:p-16 text-center">

            <h2 className="text-4xl mb-4">
              🛒
            </h2>

            <h3 className="text-2xl font-semibold">
              Your Cart is Empty
            </h3>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added anything yet.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-black text-white px-8 py-3 rounded-lg"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">

              {cartItems.map((item) => (

                <div
                  key={`${item.id}-${item.size}`}
                  className="
                    bg-white
                    rounded-xl
                    shadow
                    p-3
                    sm:p-5
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                  "
                >

                  {/* Image */}
                  <div className="w-full sm:w-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        block
                        w-full
                        h-auto
                        object-contain
                      "
                    />

                  </div>

                  {/* Information */}
                  <div className="flex-1">

                    <h2 className="text-xl sm:text-2xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      ₹{item.price}
                    </p>

                    <p className="mt-2 font-medium">
                      Size:{" "}
                      <span className="font-bold">
                        {item.size}
                      </span>
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-4">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.size
                          )
                        }
                        className="border px-4 py-2 rounded"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.size
                          )
                        }
                        className="border px-4 py-2 rounded"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size
                        )
                      }
                      className="text-red-500 mt-4"
                    >
                      Remove Item
                    </button>

                  </div>

                  <div className="text-xl sm:text-2xl font-bold">
                    ₹
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </div>

                </div>

              ))}

            </div>

            {/* Order Summary */}
            <div>

              <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:sticky lg:top-24">

                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{cartItems.length}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0
                        ? "FREE"
                        : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>
                      ₹{gst.toFixed(2)}
                    </span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl sm:text-2xl font-bold">
                    <span>Total</span>
                    <span>
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                </div>

                {shipping === 0 ? (
                  <div className="mt-5 text-green-600 font-medium">
                    🎉 You unlocked FREE Shipping!
                  </div>
                ) : (
                  <div className="mt-5 text-sm text-gray-500">
                    Add products worth{" "}
                    <span className="font-semibold">
                      ₹{(999 - subtotal).toFixed(2)}
                    </span>{" "}
                    more to get FREE Shipping.
                  </div>
                )}

                <button
                  onClick={() => navigate("/checkout")}
                  className="
                    w-full
                    mt-8
                    bg-black
                    text-white
                    py-4
                    rounded-lg
                    text-lg
                    hover:bg-gray-800
                  "
                >
                  Proceed To Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="
                    w-full
                    mt-4
                    border
                    border-black
                    py-4
                    rounded-lg
                    hover:bg-black
                    hover:text-white
                  "
                >
                  Continue Shopping
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;