import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PGCard } from '@/components/pg/PGCard';
import { pgListings } from '@/lib/data/pgData';

export function FeaturedPGs() {
  const featuredPGs = pgListings.filter((pg) => pg.featured).slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Top Picks
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured PG Accommodations
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Hand-picked premium stays loved by CU students for their comfort, location, and amenities.
            </p>
          </div>
          <Link to="/pg">
            <Button variant="outline" className="gap-2">
              View All PGs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPGs.map((pg, index) => (
            <PGCard key={pg.id} pg={pg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
