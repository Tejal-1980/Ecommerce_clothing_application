import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";

function ProductList() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${BASEURL}/api/products/`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [BASEURL]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;

    const keyword = debouncedSearch.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.name.toLowerCase().includes(keyword)
      );
    });
  }, [products, debouncedSearch]);

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

      <section className="bg-gradient-to-r from-black to-gray-700 text-white">
        <div className="max-w-7xl mx-auto py-24 text-center">
          <h1 className="text-6xl font-bold">
            Summer Collection 2026
          </h1>

          <p className="mt-5 text-xl">
            Discover Premium Fashion
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {search
              ? `Search: "${search}"`
              : "Featured Products"}
          </h2>

          <span>{filteredProducts.length} Products</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-7xl mb-5">
              🔍
            </div>

            <h2 className="text-3xl font-bold">
              Product Not Available
            </h2>

            <p className="text-gray-500 mt-3">
              No product found for "{search}"
            </p>

          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
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