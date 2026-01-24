import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PGCard } from '@/components/pg/PGCard';
import { pgListings } from '@/lib/data/pgData';
import { useWishlist } from '@/contexts/WishlistContext';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  
  const wishlistPGs = pgListings.filter((pg) => wishlist.includes(pg.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistPGs.length} saved PG{wishlistPGs.length !== 1 ? 's' : ''}
            </p>
          </div>

          {wishlistPGs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistPGs.map((pg, index) => (
                <PGCard key={pg.id} pg={pg} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start exploring PGs and save your favorites by clicking the heart icon on any listing.
              </p>
              <Link to="/pg">
                <Button className="gap-2">
                  Explore PGs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
