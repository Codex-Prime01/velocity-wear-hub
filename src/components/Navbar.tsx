
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Shoes', path: '/category/shoes' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Accessories', path: '/category/accessories' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-heading text-xl md:text-2xl font-bold text-primary">VELOCITY</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag size={20} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <CartDrawer />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag size={20} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <CartDrawer />
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground/70 hover:text-primary px-4 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 px-4 pt-2">
                <Button variant="ghost" size="icon">
                  <Search size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
