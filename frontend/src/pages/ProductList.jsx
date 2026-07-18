// src/pages/ProductList.jsx

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

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
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [BASEURL]);

  const categories = useMemo(() => {
    const all = products.map((p) => p.category.name);
    return ["All", ...new Set(all)];
  }, [products]);

  useEffect(() => {
    let data = [...products];

    if (searchQuery) {
      data = data.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter(
        (product) => product.category.name === category
      );
    }

    if (sortBy === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "newest") {
      data.sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );
    }

    setFilteredProducts(data);
  }, [products, category, sortBy, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero */}

      <section className="bg-gradient-to-r from-black to-gray-700 text-white">

        <div className="max-w-7xl mx-auto py-24 text-center">

          <h1 className="text-6xl font-bold">
            Summer Collection 2026
          </h1>

          <p className="mt-5 text-xl">
            Premium Fashion For Everyone
          </p>

        </div>

      </section>

      {/* Filter */}

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap gap-5 justify-between items-center">

        <h2 className="text-3xl font-bold">
          Products
        </h2>

        <div className="flex gap-4">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="default">
              Sort
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

            <option value="newest">
              Newest
            </option>
          </select>

        </div>

      </div>

      {/* Products */}

      <div className="max-w-7xl mx-auto px-6 pb-12">

        {filteredProducts.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 py-24">
            No Products Found
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

      </div>

    </div>
  );
}

export default ProductList;