
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Trash, 
  ShoppingCart, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag 
} from "lucide-react";

const CartPage = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="bg-primary/10 p-6 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">
              Start Shopping
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4 text-sm font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="p-4 sm:py-6">
                  <div className="grid sm:grid-cols-12 gap-4">
                    {/* Product */}
                    <div className="col-span-6 flex space-x-4">
                      <div className="relative h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="h-full w-full object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Link 
                          to={`/products/${item.id}`} 
                          className="font-medium hover:text-primary line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-600 hover:text-red-800 mt-auto inline-flex items-center"
                        >
                          <Trash className="h-3.5 w-3.5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="sm:hidden font-medium">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="sm:hidden font-medium">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end">
                      <span className="sm:hidden font-medium">Total:</span>
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Continue Shopping
            </Button>
            <Button 
              variant="destructive" 
              onClick={clearCart} 
              className="bg-red-600 hover:bg-red-700"
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
