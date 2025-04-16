
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container-custom flex items-center justify-center min-h-[70vh] py-16">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
