import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Wifi, Utensils, Wind, Car, Shield, GitCompare, Check } from 'lucide-react';
import { PGListing } from '@/lib/data/pgData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';
import { cn } from '@/lib/utils';

interface PGCardProps {
  pg: PGListing;
  index?: number;
}

export function PGCard({ pg, index = 0 }: PGCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'boys':
        return 'bg-blue-100 text-blue-700';
      case 'girls':
        return 'bg-pink-100 text-pink-700';
      case 'co-ed':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'limited':
        return 'bg-yellow-100 text-yellow-700';
      case 'full':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-muted animate-pulse",
          imageLoaded && "hidden"
        )} />
        <img
          src={pg.images[0]}
          alt={pg.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
            !imageLoaded && "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {pg.featured && (
            <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
          )}
          {pg.verified && (
            <Badge variant="outline" className="bg-card/90 backdrop-blur-sm">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(pg.id);
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all",
              isInWishlist(pg.id)
                ? "bg-red-500 text-primary-foreground"
                : "bg-card/90 backdrop-blur-sm text-foreground hover:bg-card"
            )}
          >
            <Heart className={cn("h-4 w-4", isInWishlist(pg.id) && "fill-current")} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(pg.id);
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all",
              isInCompare(pg.id)
                ? "bg-primary text-primary-foreground"
                : "bg-card/90 backdrop-blur-sm text-foreground hover:bg-card"
            )}
          >
            {isInCompare(pg.id) ? <Check className="h-4 w-4" /> : <GitCompare className="h-4 w-4" />}
          </button>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-card/95 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-lg text-foreground">
                ₹{pg.price.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-xs">/mo</span>
            </div>
            {pg.originalPrice && (
              <span className="text-muted-foreground text-xs line-through">
                ₹{pg.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex gap-2">
            <Badge className={getTypeColor(pg.type)} variant="secondary">
              {pg.type === 'co-ed' ? 'Co-Ed' : pg.type.charAt(0).toUpperCase() + pg.type.slice(1)}
            </Badge>
            <Badge className={getAvailabilityColor(pg.availability)} variant="secondary">
              {pg.availability.charAt(0).toUpperCase() + pg.availability.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium">{pg.rating}</span>
            <span className="text-muted-foreground">({pg.reviewCount})</span>
          </div>
        </div>

        <Link to={`/pg/${pg.slug}`}>
          <h3 className="font-display font-semibold text-lg text-foreground hover:text-primary transition-colors mb-1">
            {pg.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>{pg.location}</span>
          <span className="mx-1">•</span>
          <span>{pg.distance} from campus</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 text-muted-foreground mb-4">
          {pg.wifi && (
            <div className="flex items-center gap-1 text-xs">
              <Wifi className="h-4 w-4" />
              <span>WiFi</span>
            </div>
          )}
          {pg.meals && (
            <div className="flex items-center gap-1 text-xs">
              <Utensils className="h-4 w-4" />
              <span>Meals</span>
            </div>
          )}
          {pg.ac && (
            <div className="flex items-center gap-1 text-xs">
              <Wind className="h-4 w-4" />
              <span>AC</span>
            </div>
          )}
          {pg.parking && (
            <div className="flex items-center gap-1 text-xs">
              <Car className="h-4 w-4" />
              <span>Parking</span>
            </div>
          )}
        </div>

        <Link to={`/pg/${pg.slug}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
