
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  Clock, 
  ArrowUpRight
} from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";

const HomePage = () => {
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Discover Amazing Products for Every Need
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Shop the latest trends with confidence. Quality products, competitive prices, and fast delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/products?category=electronics">
                    Explore Electronics
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80" 
                alt="Shopping Experience" 
                className="rounded-lg shadow-xl max-h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of products across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-lg bg-gray-100 h-48 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-6 group-hover:bg-opacity-20 transition-all duration-300">
                  <h3 className="text-white text-xl font-bold capitalize text-center">
                    {category}
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked products for you</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ProductGrid products={featuredProducts} isLoading={isProductsLoading} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery on all products</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white border">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated selection of best products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Stay updated with our latest products and offers
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
