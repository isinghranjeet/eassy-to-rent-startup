import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Heart, GitCompare, Share2, Phone, 
  Wifi, Utensils, Wind, Car, Shield, Zap, Dumbbell, BookOpen,
  Check, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pgListings } from '@/lib/data/pgData';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi,
  'Meals': Utensils,
  'AC': Wind,
  'Parking': Car,
  'CCTV': Shield,
  'Power Backup': Zap,
  'Gym': Dumbbell,
  'Study Room': BookOpen,
  'Laundry': Check,
  'Swimming Pool': Check,
  'Yoga Room': Check,
};

const PGDetail = () => {
  const { slug } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const pg = pgListings.find((p) => p.slug === slug);

  if (!pg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">PG Not Found</h1>
            <Link to="/pg">
              <Button>Back to Listings</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pg.name,
          text: `Check out ${pg.name} on CU PG Finder`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleContactOwner = () => {
    toast.success('Contact request sent!', {
      description: `The owner ${pg.ownerName} will reach out to you soon.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/pg" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
            <div 
              className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={pg.images[0]}
                alt={pg.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            </div>
            {pg.images.slice(1, 3).map((image, index) => (
              <div 
                key={index}
                className="hidden md:block relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentImage(index + 1);
                  setShowGallery(true);
                }}
              >
                <img
                  src={image}
                  alt={`${pg.name} ${index + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                {index === 1 && pg.images.length > 3 && (
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-semibold text-lg">
                      +{pg.images.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Modal */}
        {showGallery && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setCurrentImage((prev) => (prev === 0 ? pg.images.length - 1 : prev - 1))}
              className="absolute left-4 w-12 h-12 rounded-full bg-card flex items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <img
              src={pg.images[currentImage]}
              alt={`${pg.name} ${currentImage + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
            />
            
            <button
              onClick={() => setCurrentImage((prev) => (prev === pg.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 w-12 h-12 rounded-full bg-card flex items-center justify-center"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {pg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    currentImage === index ? "bg-primary" : "bg-card/50"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className={pg.type === 'boys' ? 'bg-blue-100 text-blue-700' : pg.type === 'girls' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'}>
                    {pg.type === 'co-ed' ? 'Co-Ed' : pg.type.charAt(0).toUpperCase() + pg.type.slice(1)}
                  </Badge>
                  {pg.verified && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                  {pg.featured && (
                    <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {pg.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{pg.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium text-foreground">{pg.rating}</span>
                    <span>({pg.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  About this PG
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {pg.description}
                </p>
              </div>

              {/* Room Types */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Room Types Available
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pg.roomTypes.map((room) => (
                    <Badge key={room} variant="secondary" className="text-sm py-1.5 px-3">
                      {room} Occupancy
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pg.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Check;
                    return (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Location
                </h2>
                <div className="bg-muted/50 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{pg.address}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {pg.distance} from CU campus
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 card-shadow">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-foreground">
                      ₹{pg.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {pg.originalPrice && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground line-through">
                        ₹{pg.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-green-100 text-green-700">
                        {Math.round((1 - pg.price / pg.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Availability */}
                <div className={cn(
                  "flex items-center gap-2 p-3 rounded-xl mb-6",
                  pg.availability === 'available' ? 'bg-green-50 text-green-700' :
                  pg.availability === 'limited' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    pg.availability === 'available' ? 'bg-green-500' :
                    pg.availability === 'limited' ? 'bg-yellow-500' :
                    'bg-red-500'
                  )} />
                  <span className="font-medium">
                    {pg.availability === 'available' ? 'Rooms Available' :
                     pg.availability === 'limited' ? 'Limited Rooms' :
                     'Currently Full'}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button onClick={handleContactOwner} size="lg" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Owner
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleWishlist(pg.id)}
                      className={cn(
                        "gap-1",
                        isInWishlist(pg.id) && "bg-red-50 border-red-200 text-red-600"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", isInWishlist(pg.id) && "fill-current")} />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toggleCompare(pg.id)}
                      className={cn(
                        "gap-1",
                        isInCompare(pg.id) && "bg-primary/10 border-primary/20 text-primary"
                      )}
                    >
                      <GitCompare className="h-4 w-4" />
                      Compare
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="gap-1">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display font-semibold text-primary">
                        {pg.ownerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{pg.ownerName}</p>
                      <p className="text-muted-foreground text-sm">Property Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PGDetail;
