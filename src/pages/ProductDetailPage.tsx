
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  ChevronRight, 
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0");
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId && productId > 0,
  });
  
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => {
      if (!product) return [];
      return data
        .filter(
          (p) => p.category === product.category && p.id !== product.id
        )
        .slice(0, 4);
    },
    enabled: !!product,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-md animate-pulse h-[500px]" />
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-md animate-pulse h-8 w-3/4" />
            <div className="bg-gray-100 rounded-md animate-pulse h-6 w-1/4" />
            <div className="bg-gray-100 rounded-md animate-pulse h-4 w-full" />
            <div className="bg-gray-100 rounded-md animate-pulse h-4 w-full" />
            <div className="bg-gray-100 rounded-md animate-pulse h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <Link to="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <Link 
          to={`/products?category=${product.category}`} 
          className="text-muted-foreground hover:text-foreground capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium truncate max-w-[200px]">
          {product.title}
        </span>
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index} 
                  className={`h-5 w-5 ${
                    index < Math.floor(product.rating.rate) 
                      ? "fill-warning text-warning" 
                      : "text-gray-300"
                  }`} 
                />
              ))}
              <span className="ml-2 text-sm font-medium">{product.rating.rate}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.count} reviews
            </span>
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-4 mb-8">
            <Button 
              size="lg" 
              className="flex-1" 
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="flex-1"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/cart");
              }}
            >
              Buy Now
            </Button>
          </div>
          
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">Free Shipping</span>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">2 Year Warranty</span>
                <p className="text-sm text-muted-foreground">Full coverage</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">30 Days Return</span>
                <p className="text-sm text-muted-foreground">Money back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
