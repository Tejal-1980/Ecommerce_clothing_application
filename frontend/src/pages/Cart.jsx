import { useNavigate } from "react-router-dom";

import { useCart } from "../context/useCart";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const subtotal =
    cartItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
        item.quantity,
      0
    );

  const shipping =
    subtotal > 999 ? 0 : 99;

  const gst =
    subtotal * 0.18;

  const total =
    subtotal +
    shipping +
    gst;

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        py-4
        sm:py-8
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-3
          sm:px-6
        "
      >

        <h1
          className="
            text-2xl
            sm:text-4xl
            font-bold
            mb-5
            sm:mb-8
          "
        >
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <div
            className="
              bg-white
              rounded-xl
              shadow
              p-8
              sm:p-16
              text-center
            "
          >

            <h2 className="text-4xl mb-4">
              🛒
            </h2>

            <h3
              className="
                text-xl
                sm:text-2xl
                font-semibold
              "
            >
              Your Cart is Empty
            </h3>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added
              anything yet.
            </p>

            <button
              onClick={() =>
                navigate("/")
              }
              className="
                mt-6
                bg-black
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div
            className="
              grid
              lg:grid-cols-3
              gap-5
              lg:gap-8
            "
          >

            {/* CART ITEMS */}
            <div
              className="
                lg:col-span-2
                space-y-4
              "
            >

              {cartItems.map(
                (item) => (

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

                    {/* IMAGE */}

                    <div
                      className="
                        w-full
                        sm:w-40
                        md:w-48
                        flex-shrink-0
                        aspect-[4/5]
                        bg-gray-100
                        rounded-lg
                        overflow-hidden
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-contain
                          block
                        "
                      />

                    </div>

                    {/* INFO */}

                    <div
                      className="
                        flex-1
                        min-w-0
                      "
                    >

                      <h2
                        className="
                          text-lg
                          sm:text-2xl
                          font-semibold
                        "
                      >
                        {item.name}
                      </h2>

                      <p
                        className="
                          text-gray-500
                          mt-2
                        "
                      >
                        ₹{item.price}
                      </p>

                      <p className="mt-2">
                        Size:{" "}
                        <span className="font-bold">
                          {item.size}
                        </span>
                      </p>

                      {/* QUANTITY */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mt-4
                        "
                      >

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id,
                              item.size
                            )
                          }
                          className="
                            w-9
                            h-9
                            border
                            rounded
                            flex
                            items-center
                            justify-center
                          "
                        >
                          −
                        </button>

                        <span
                          className="
                            min-w-6
                            text-center
                            font-semibold
                          "
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id,
                              item.size
                            )
                          }
                          className="
                            w-9
                            h-9
                            border
                            rounded
                            flex
                            items-center
                            justify-center
                          "
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
                        className="
                          text-red-500
                          mt-4
                          text-sm
                          hover:underline
                        "
                      >
                        Remove Item
                      </button>

                    </div>

                    {/* ITEM TOTAL */}

                    <div
                      className="
                        text-lg
                        sm:text-xl
                        font-bold
                        sm:self-start
                      "
                    >
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </div>

                  </div>

                )
              )}

            </div>

            {/* SUMMARY */}

            <div>

              <div
                className="
                  bg-white
                  rounded-xl
                  shadow
                  p-5
                  sm:p-6
                  lg:sticky
                  lg:top-24
                "
              >

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    mb-5
                  "
                >
                  Order Summary
                </h2>

                <div
                  className="
                    space-y-4
                  "
                >

                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>
                      {cartItems.length}
                    </span>
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

                  <div
                    className="
                      flex
                      justify-between
                      text-xl
                      font-bold
                    "
                  >
                    <span>Total</span>
                    <span>
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                </div>

                {shipping === 0 ? (

                  <div
                    className="
                      mt-5
                      text-green-600
                      font-medium
                      text-sm
                    "
                  >
                    🎉 You unlocked FREE
                    Shipping!
                  </div>

                ) : (

                  <div
                    className="
                      mt-5
                      text-sm
                      text-gray-500
                    "
                  >
                    Add products worth{" "}
                    <span className="font-semibold">
                      ₹
                      {(
                        999 - subtotal
                      ).toFixed(2)}
                    </span>{" "}
                    more to get FREE
                    Shipping.
                  </div>

                )}

                <button
                  onClick={() =>
                    navigate("/checkout")
                  }
                  className="
                    w-full
                    mt-7
                    bg-black
                    text-white
                    py-3
                    rounded-lg
                    hover:bg-gray-800
                  "
                >
                  Proceed To Checkout
                </button>

                <button
                  onClick={() =>
                    navigate("/")
                  }
                  className="
                    w-full
                    mt-3
                    border
                    border-black
                    py-3
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