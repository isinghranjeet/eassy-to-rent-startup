import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">CU</span>
              </div>
              <span className="font-display font-bold text-xl">PG Finder</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted companion to find the perfect paying guest accommodation near CU campus. Safe, verified, and affordable.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/pg', label: 'Find PG' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQs' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Popular Areas</h4>
            <ul className="space-y-2">
              {[
                'Near Gate 1',
                'Library Road',
                'Sports Complex',
                'Near Cafeteria',
                'Admin Block Area',
                'Back Gate Area',
              ].map((location) => (
                <li key={location}>
                  <Link
                    to={`/pg?location=${encodeURIComponent(location)}`}
                    className="text-muted-foreground hover:text-background text-sm transition-colors"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  CU Campus, University Road,<br />
                  Chandigarh - 160014
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">contact@cupgfinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 CU PG Finder. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Made with ❤️ for CU Students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
