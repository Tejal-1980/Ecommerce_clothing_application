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

  // Fetch products
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

  // Search / filter products
  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return products;
    }

    const keyword = debouncedSearch.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.name.toLowerCase().includes(keyword)
      );
    });
  }, [products, debouncedSearch]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading products...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-black to-gray-700 text-white">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            py-12
            sm:py-16
            md:py-20
            lg:py-24
            text-center
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
            "
          >
            Summer Collection 2026
          </h1>

          <p
            className="
              mt-3
              sm:mt-4
              md:mt-5
              text-base
              sm:text-lg
              md:text-xl
            "
          >
            Discover Premium Fashion
          </p>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-3
          sm:px-5
          md:px-6
          py-8
          sm:py-10
          md:py-12
        "
      >

        {/* Heading */}
        <div
          className="
            flex
            justify-between
            items-center
            gap-3
            mb-6
            sm:mb-8
          "
        >
          <h2
            className="
              text-lg
              sm:text-2xl
              md:text-3xl
              font-bold
              truncate
            "
          >
            {search
              ? `Search: "${search}"`
              : "Featured Products"}
          </h2>

          <span
            className="
              text-xs
              sm:text-sm
              md:text-base
              text-gray-600
              whitespace-nowrap
            "
          >
            {filteredProducts.length} Products
          </span>
        </div>

        {/* ================= NO PRODUCTS ================= */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20">

            <div className="text-6xl sm:text-7xl mb-5">
              🔍
            </div>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
              "
            >
              Product Not Available
            </h2>

            <p
              className="
                text-gray-500
                mt-3
                text-sm
                sm:text-base
              "
            >
              No product found for "{search}"
            </p>

          </div>
        ) : (

          /* ================= PRODUCT GRID ================= */
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-5
              md:grid-cols-3
              lg:grid-cols-4
              xl:gap-6
            "
          >
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