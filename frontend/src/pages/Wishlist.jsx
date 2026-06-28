import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlist,
    removeWishlist,
  } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2>No items in wishlist.</h2>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded p-4"
            >
              <img
                src={item.image}
                className="h-48 w-full object-cover"
              />

              <h2 className="mt-3 font-bold">
                {item.name}
              </h2>

              <button
                onClick={() =>
                  removeWishlist(item.id)
                }
                className="mt-3 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;