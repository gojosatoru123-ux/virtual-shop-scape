
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">ShopHub</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for all your shopping needs with the best prices and quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Account</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-600 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelery" className="text-gray-600 hover:text-primary transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=men's clothing" className="text-gray-600 hover:text-primary transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=women's clothing" className="text-gray-600 hover:text-primary transition-colors">
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Shopping Street, Retail City, RC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary" />
                <span className="text-gray-600">support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
