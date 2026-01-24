import { Link } from 'react-router-dom';
import { GitCompare, ArrowRight, X, Check, Minus } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pgListings, amenitiesList } from '@/lib/data/pgData';
import { useCompare } from '@/contexts/CompareContext';
import { cn } from '@/lib/utils';

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  
  const comparePGs = pgListings.filter((pg) => compareList.includes(pg.id));

  const comparisonFields = [
    { label: 'Price', key: 'price' as const, format: (v: number) => `₹${v.toLocaleString()}/mo` },
    { label: 'Rating', key: 'rating' as const, format: (v: number) => `${v} ⭐` },
    { label: 'Reviews', key: 'reviewCount' as const, format: (v: number) => `${v} reviews` },
    { label: 'Distance', key: 'distance' as const, format: (v: string) => v },
    { label: 'Location', key: 'location' as const, format: (v: string) => v },
    { label: 'Room Types', key: 'roomTypes' as const, format: (v: string[]) => v.join(', ') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Compare PGs
              </h1>
              <p className="text-muted-foreground">
                {comparePGs.length} PG{comparePGs.length !== 1 ? 's' : ''} selected (max 3)
              </p>
            </div>
            {comparePGs.length > 0 && (
              <Button variant="outline" onClick={clearCompare}>
                Clear All
              </Button>
            )}
          </div>

          {comparePGs.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* PG Cards Row */}
                <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `200px repeat(${comparePGs.length}, 1fr)` }}>
                  <div /> {/* Empty cell for label column */}
                  {comparePGs.map((pg) => (
                    <div key={pg.id} className="bg-card rounded-2xl p-4 card-shadow relative">
                      <button
                        onClick={() => removeFromCompare(pg.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={pg.images[0]}
                        alt={pg.name}
                        className="w-full h-32 object-cover rounded-xl mb-3"
                      />
                      <Badge className={pg.type === 'boys' ? 'bg-blue-100 text-blue-700' : pg.type === 'girls' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'}>
                        {pg.type === 'co-ed' ? 'Co-Ed' : pg.type.charAt(0).toUpperCase() + pg.type.slice(1)}
                      </Badge>
                      <Link to={`/pg/${pg.slug}`}>
                        <h3 className="font-display font-semibold text-foreground mt-2 hover:text-primary transition-colors">
                          {pg.name}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Comparison Table */}
                <div className="bg-card rounded-2xl card-shadow overflow-hidden">
                  {/* Basic Info */}
                  {comparisonFields.map((field, index) => (
                    <div
                      key={field.key}
                      className={cn(
                        "grid gap-4 py-4 px-6",
                        index % 2 === 0 && "bg-muted/30"
                      )}
                      style={{ gridTemplateColumns: `200px repeat(${comparePGs.length}, 1fr)` }}
                    >
                      <div className="font-medium text-foreground">{field.label}</div>
                      {comparePGs.map((pg) => {
                        const value = pg[field.key];
                        if (field.key === 'price' || field.key === 'rating' || field.key === 'reviewCount') {
                          return (
                            <div key={pg.id} className="text-muted-foreground">
                              {(field.format as (v: number) => string)(value as number)}
                            </div>
                          );
                        } else if (field.key === 'roomTypes') {
                          return (
                            <div key={pg.id} className="text-muted-foreground">
                              {(field.format as (v: string[]) => string)(value as string[])}
                            </div>
                          );
                        } else {
                          return (
                            <div key={pg.id} className="text-muted-foreground">
                              {(field.format as (v: string) => string)(value as string)}
                            </div>
                          );
                        }
                      })}
                    </div>
                  ))}

                  {/* Amenities Section */}
                  <div className="py-4 px-6 bg-primary/5">
                    <div className="font-display font-semibold text-foreground">Amenities</div>
                  </div>
                  {amenitiesList.map((amenity, index) => (
                    <div
                      key={amenity}
                      className={cn(
                        "grid gap-4 py-3 px-6",
                        index % 2 === 0 && "bg-muted/30"
                      )}
                      style={{ gridTemplateColumns: `200px repeat(${comparePGs.length}, 1fr)` }}
                    >
                      <div className="text-muted-foreground">{amenity}</div>
                      {comparePGs.map((pg) => (
                        <div key={pg.id}>
                          {pg.amenities.includes(amenity) ? (
                            <Check className="h-5 w-5 text-primary" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground/40" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Action Row */}
                  <div
                    className="grid gap-4 py-6 px-6 bg-muted/50"
                    style={{ gridTemplateColumns: `200px repeat(${comparePGs.length}, 1fr)` }}
                  >
                    <div />
                    {comparePGs.map((pg) => (
                      <div key={pg.id}>
                        <Link to={`/pg/${pg.slug}`}>
                          <Button className="w-full">View Details</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <GitCompare className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No PGs to compare
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Add PGs to compare by clicking the compare icon on any listing. You can compare up to 3 PGs at a time.
              </p>
              <Link to="/pg">
                <Button className="gap-2">
                  Browse PGs
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

export default Compare;
