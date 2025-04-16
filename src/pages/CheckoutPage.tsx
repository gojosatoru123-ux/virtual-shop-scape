
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CreditCard,
  ShoppingBag,
  Check,
  ChevronRight,
  Lock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (items.length === 0) {
      navigate("/cart");
      toast.error("Your cart is empty. Add items before checkout.");
    }
  }, [items, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateShippingForm = () => {
    const requiredFields = [
      "firstName", 
      "lastName", 
      "email", 
      "phone", 
      "address", 
      "city", 
      "state", 
      "zip", 
      "country"
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const validatePaymentForm = () => {
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error("Please fill in all payment details");
      return false;
    }
    
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      toast.error("Please enter a valid card number");
      return false;
    }
    
    return true;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateShippingForm()) {
      setActiveStep("payment");
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePaymentForm()) {
      setIsSubmitting(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsSubmitting(false);
        setActiveStep("confirmation");
        clearCart();
        window.scrollTo(0, 0);
      }, 1500);
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${activeStep === "shipping" ? "text-primary" : "text-gray-500"}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeStep === "shipping" ? "bg-primary text-white" : activeStep === "payment" || activeStep === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {activeStep === "payment" || activeStep === "confirmation" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <ShoppingBag className="h-5 w-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">Shipping</span>
            </div>
            
            <div className="flex-1 mx-4 h-1 bg-gray-200">
              <div className={`h-full ${activeStep === "shipping" ? "w-0" : "w-full"} bg-green-600 transition-all duration-300`} />
            </div>
            
            <div className={`flex flex-col items-center ${activeStep === "payment" ? "text-primary" : activeStep === "confirmation" ? "text-green-600" : "text-gray-500"}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeStep === "payment" ? "bg-primary text-white" : activeStep === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {activeStep === "confirmation" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">Payment</span>
            </div>
            
            <div className="flex-1 mx-4 h-1 bg-gray-200">
              <div className={`h-full ${activeStep === "confirmation" ? "w-full" : "w-0"} bg-green-600 transition-all duration-300`} />
            </div>
            
            <div className={`flex flex-col items-center ${activeStep === "confirmation" ? "text-green-600" : "text-gray-500"}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeStep === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {activeStep === "confirmation" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Forms */}
        {activeStep === "shipping" && (
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>
                    Enter your shipping details to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="shipping-form" onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={formData.country} 
                          onValueChange={(value) => handleSelectChange("country", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="CAN">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AUS">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button 
                    form="shipping-form" 
                    type="submit" 
                    className="ml-auto"
                  >
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <div className="flex items-start">
                          <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>Total</span>
                      <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeStep === "payment" && (
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Payment Information
                    <Lock className="ml-2 h-4 w-4 text-green-600" />
                  </CardTitle>
                  <CardDescription>
                    Complete your purchase securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="credit">
                    <TabsList className="mb-4">
                      <TabsTrigger value="credit">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit">
                      <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center pt-4">
                          <div className="flex space-x-2 items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogN78WwUreL5T8YbnPZnEiL-RvYVQJdYIqvwfWE9EZw&s" className="h-6" alt="Visa" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTw_5VIcwwGiVOdNitlnV21FUjJMlqpPkBPl2gAhM5X-3h8-W98BSCXW81FA&s" className="h-6" alt="Mastercard" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7S3p_W0h0JKQOoOki2uUO0OStZ5TnBB2IzLEAsZGUw&s" className="h-6" alt="American Express" />
                          </div>
                          <span className="ml-auto text-sm text-muted-foreground flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            Secure payment
                          </span>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="paypal">
                      <div className="text-center py-6">
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbwC0x3fLTQOOBVZbykb--N54GQMX1Zlmb2nGLfmPiA&s" 
                          alt="PayPal" 
                          className="h-12 mx-auto mb-4" 
                        />
                        <p className="text-muted-foreground mb-4">
                          You'll be redirected to PayPal to complete your purchase securely.
                        </p>
                        <Button 
                          type="button" 
                          className="bg-[#0070ba] hover:bg-[#005ea6]"
                          onClick={() => {
                            toast.info("PayPal functionality not implemented in this demo");
                          }}
                        >
                          Pay with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep("shipping")}
                  >
                    Back to Shipping
                  </Button>
                  <Button 
                    form="payment-form" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Complete Order
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <div className="flex items-start">
                          <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>Total</span>
                      <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeStep === "confirmation" && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-600 animate-fade-in">
              <CardContent className="pt-6 text-center">
                <div className="h-20 w-20 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-lg mb-6">
                  Thank you for your purchase, {formData.firstName}!
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                  <p className="font-medium mb-2">Order Details:</p>
                  <p className="text-sm mb-1">Order #: 25791368</p>
                  <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <p className="text-muted-foreground mb-6">
                  A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="#" onClick={() => window.print()}>
                      Print Receipt
                    </a>
                  </Button>
                  <Button asChild>
                    <a href="/">
                      Continue Shopping
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
