
import { Product, Category } from "@/types";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products in category ${category}`);
  }
  return response.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Fake Store API doesn't have a search endpoint, so we'll fetch all products
  // and filter them client-side
  const products = await getProducts();
  
  return products.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
}
