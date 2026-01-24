import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Star,
  Wifi,
  Utensils,
  Wind,
  Car,
  Shield,
  GitCompare,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

const PHONE_NUMBER = '9315058665';

export function PGCard({ pg, index = 0 }: PGCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % pg.images.length);

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? pg.images.length - 1 : prev - 1
    );

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pg.images[currentImage]}
          alt={pg.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {pg.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2">
          {pg.featured && <Badge>Featured</Badge>}
          {pg.verified && (
            <Badge variant="outline">
              <Shield className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
        </div>

        {/* WISHLIST / COMPARE */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(pg.id);
            }}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center',
              isInWishlist(pg.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/90'
            )}
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isInWishlist(pg.id) && 'fill-current'
              )}
            />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(pg.id);
            }}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center',
              isInCompare(pg.id)
                ? 'bg-primary text-white'
                : 'bg-white/90'
            )}
          >
            {isInCompare(pg.id) ? (
              <Check className="h-4 w-4" />
            ) : (
              <GitCompare className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* PRICE */}
        <div className="absolute bottom-3 right-3 bg-white/90 rounded-xl px-3 py-1">
          <span className="font-bold text-lg">
            ₹{pg.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground"> /mo</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-sm mb-2">
          <Star className="h-4 w-4 fill-warning text-warning" />
          {pg.rating} ({pg.reviewCount})
        </div>

        <Link to={`/pg/${pg.slug}`}>
          <h3 className="font-semibold text-lg hover:text-primary">
            {pg.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          {pg.location} • {pg.distance}
        </div>

        {/* AMENITIES */}
        <div className="flex gap-3 text-xs mb-4 text-muted-foreground">
          {pg.wifi && <Wifi className="h-4 w-4" />}
          {pg.meals && <Utensils className="h-4 w-4" />}
          {pg.ac && <Wind className="h-4 w-4" />}
          {pg.parking && <Car className="h-4 w-4" />}
        </div>

        {/* CTA */}
        <div className="grid grid-cols-3 gap-2">
          <Link to={`/pg/${pg.slug}`}>
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>

          <a href={`tel:${PHONE_NUMBER}`}>
            <Button className="w-full">📞 Call</Button>
          </a>

          <a
            href={`https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(
              `Hi, I am interested in ${pg.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="w-full">
              💬 WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
