
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/products?category=electronics" className="font-medium hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link to="/products?category=jewelery" className="font-medium hover:text-primary transition-colors">
              Jewelry
            </Link>
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-1/3">
            <Input
              type="search"
              placeholder="Search products..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full py-6">
                  <div className="mb-8">
                    <form onSubmit={handleSearch} className="flex relative">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                      Home
                    </Link>
                    <Link to="/products" className="text-lg font-medium hover:text-primary transition-colors">
                      Shop
                    </Link>
                    <Link to="/products?category=electronics" className="text-lg font-medium hover:text-primary transition-colors">
                      Electronics
                    </Link>
                    <Link to="/products?category=jewelery" className="text-lg font-medium hover:text-primary transition-colors">
                      Jewelry
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
