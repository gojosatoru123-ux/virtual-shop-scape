
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsByCategory, searchProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { Product } from "@/types";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || Infinity);
  
  // Fetch products based on search or category
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", category, searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        return searchProducts(searchQuery);
      } else if (category) {
        return getProductsByCategory(category);
      } else {
        return getProducts();
      }
    },
  });

  // Apply price filter
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
      setFilteredProducts(filtered);
    }
  }, [products, minPrice, maxPrice]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    console.error("Error fetching products:", error);
    return (
      <div className="container-custom py-12">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Failed to load products</h3>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-3">
        {searchQuery
          ? `Search Results for: "${searchQuery}"`
          : category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : "All Products"}
      </h1>
      
      <p className="text-muted-foreground mb-8">
        {filteredProducts.length > 0 && !isLoading
          ? `Showing ${filteredProducts.length} products`
          : "Finding products for you..."}
      </p>
      
      <ProductFilters />
      
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default ProductsPage;
