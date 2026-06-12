import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [BASEURL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            New Collection
          </p>

          <h1 className="mt-4 text-5xl font-bold text-gray-900">
            Fashion Store
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover timeless styles crafted for modern living.
            Explore our latest arrivals and elevate your wardrobe.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Featured Products
          </h2>

          <span className="text-gray-500">
            {products.length} Products
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">
            No products available.
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductList;