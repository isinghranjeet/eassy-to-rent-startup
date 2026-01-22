import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, GitCompare, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pg', label: 'Find PG' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">CU</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">PG Finder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="ghost" size="icon" className="relative">
                <GitCompare className="h-5 w-5" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {compareList.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/pg">
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2 pt-2 border-t border-border">
                <Link to="/wishlist" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <Heart className="h-4 w-4" />
                    Wishlist ({wishlist.length})
                  </Button>
                </Link>
                <Link to="/compare" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <GitCompare className="h-4 w-4" />
                    Compare ({compareList.length})
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
