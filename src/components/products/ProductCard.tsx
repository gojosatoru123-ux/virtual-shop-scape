
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <Card className="product-card overflow-hidden h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="overflow-hidden">
        <div className="relative pt-[100%] bg-gray-100">
          <img 
            src={product.image} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </div>
      </Link>
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{product.rating.rate}</span>
          <span className="text-sm text-muted-foreground">({product.rating.count})</span>
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-1">
            {product.title}
          </h3>
        </Link>
        <span className="inline-block text-xs badge badge-primary mb-2">
          {product.category}
        </span>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {truncateText(product.description, 70)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <Button 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
