<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Heart, GitCompare, Share2, Phone, 
  Wifi, Utensils, Wind, Car, Shield, Zap, Dumbbell, BookOpen,
  Check, ChevronLeft, ChevronRight, X, Calendar, Clock, Users,
  Download, Video, MessageCircle, Navigation, ExternalLink,
  DollarSign, Percent, TrendingUp, TrendingDown, Home,
  FileText, Mail, PhoneCall, Globe, Lock, Droplets, Sun,
  Bell, Eye, Maximize2, Minimize2, Play, Pause, RotateCw,
  ChevronDown, ChevronUp, Building, Map as MapIcon, Route,
  Calculator, Filter, BadgeCheck, Sparkles, Crown
=======
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Heart, GitCompare, Share2, Phone, 
  Wifi, Utensils, Wind, Car, Shield, Zap, Dumbbell, BookOpen,
  Check, ChevronLeft, ChevronRight, X
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
<<<<<<< HEAD
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
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
<<<<<<< HEAD
  'Laundry': Droplets,
  'Swimming Pool': Droplets,
  'Yoga Room': Sun,
  '24/7 Security': Lock,
  'Hot Water': Droplets,
  'TV': Video,
  'Refrigerator': Home,
  'Geyser': Zap,
  'Cooking': Utensils,
  'Water Purifier': Droplets,
  'Housekeeping': Shield,
  'Medical': Shield,
=======
  'Laundry': Check,
  'Swimming Pool': Check,
  'Yoga Room': Check,
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
};

const PGDetail = () => {
  const { slug } = useParams();
<<<<<<< HEAD
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [show360Tour, setShow360Tour] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [bookingMonths, setBookingMonths] = useState(3);
  const [virtualTourAngle, setVirtualTourAngle] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    visitDate: '',
    timeSlot: '',
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [availabilityPercentage, setAvailabilityPercentage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);

=======
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const pg = pgListings.find((p) => p.slug === slug);

<<<<<<< HEAD
  useEffect(() => {
    if (pg) {
      // Calculate dynamic price based on months
      const basePrice = pg.price;
      const discount = bookingMonths >= 6 ? 15 : bookingMonths >= 3 ? 10 : 0;
      const calculated = basePrice * bookingMonths * ((100 - discount) / 100);
      setCalculatedPrice(Math.round(calculated));
      setTotalSavings(basePrice * bookingMonths - calculated);
      
      // Simulate availability percentage
      const availability = Math.min(100, Math.max(10, Math.random() * 100));
      setAvailabilityPercentage(availability);
    }
  }, [pg, bookingMonths]);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVirtualTourRotate = (direction: 'left' | 'right') => {
    setVirtualTourAngle(prev => direction === 'left' ? prev - 90 : prev + 90);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Contact request submitted!', {
      description: `We'll connect you with ${pg?.ownerName} shortly.`,
    });
    setShowContactForm(false);
    setContactData({
      name: '',
      phone: '',
      email: '',
      message: '',
      visitDate: '',
      timeSlot: '',
    });
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '9315058665';
    const message = encodeURIComponent(
      `Hello, I'm interested in ${pg?.name}\n` +
      `Location: ${pg?.address}\n` +
      `Price: ₹${pg?.price}/month\n` +
      `Please contact me for more details.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const downloadBrochure = () => {
    toast.success('Brochure download started!', {
      description: 'PG details brochure downloaded.',
    });
    // In production, trigger actual PDF download
  };

  const viewOnMap = () => {
    toast.info('Opening location on map', {
      description: 'You can view directions to this PG.',
    });
    // In production, open Google Maps with coordinates
  };

  const scheduleVisit = () => {
    toast.success('Visit scheduled!', {
      description: 'We\'ll send you a confirmation email.',
    });
  };

  const calculateEMI = () => {
    const emi = pg ? (pg.price * 0.1).toFixed(2) : '0';
    toast.info(`Estimated Monthly EMI: ₹${emi}`, {
      description: 'Based on 10% of monthly rent',
    });
  };

  if (!pg) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50/50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <Home className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">PG Not Found</h1>
            <p className="text-gray-600 mb-8 max-w-md">
              The PG accommodation you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/pg">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Back to Listings
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-orange-300">
                  Go Home
                </Button>
              </Link>
            </div>
=======
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
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
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
<<<<<<< HEAD
        toast.success('Shared successfully!');
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleContactOwner = () => {
<<<<<<< HEAD
    setShowContactForm(true);
  };

  // Simulated reviews data
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent PG with great amenities. The owner is very cooperative.',
      verified: true,
      program: 'B.Tech CSE, 3rd Year'
    },
    {
      id: 2,
      name: 'Priya Patel',
      rating: 4,
      date: '1 month ago',
      comment: 'Good location and food quality. Could be cleaner.',
      verified: true,
      program: 'MBA, 2nd Year'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      rating: 5,
      date: '3 months ago',
      comment: 'Best PG near CU. Highly recommended!',
      verified: true,
      program: 'B.Com, 4th Year'
    }
  ];

  // Simulated room types with details
  const roomDetails = [
    { type: 'Single Occupancy', price: pg.price, size: '120 sq ft', available: 3 },
    { type: 'Double Occupancy', price: pg.price * 0.7, size: '180 sq ft', available: 5 },
    { type: 'Triple Occupancy', price: pg.price * 0.5, size: '220 sq ft', available: 2 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50/50">
      <Navbar />
      
      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-24 z-40 flex flex-col gap-3">
        <button
          onClick={() => toggleWishlist(pg.id)}
          className={cn(
            "w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110",
            isInWishlist(pg.id)
              ? "bg-red-500 text-white animate-pulse"
              : "bg-white text-gray-700 border border-gray-200"
          )}
          title={isInWishlist(pg.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-5 w-5", isInWishlist(pg.id) && "fill-current")} />
        </button>
        
        <button
          onClick={() => toggleCompare(pg.id)}
          className={cn(
            "w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110",
            isInCompare(pg.id)
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          )}
          title={isInCompare(pg.id) ? "Remove from compare" : "Add to compare"}
        >
          <GitCompare className="h-5 w-5" />
        </button>
        
        <button
          onClick={handleShare}
          className="w-12 h-12 rounded-full shadow-lg bg-white text-gray-700 border border-gray-200 flex items-center justify-center hover:scale-110 transition-all"
          title="Share"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <main className="flex-1">
        {/* Breadcrumb with Progress */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/pg" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to listings
            </Link>
            <div className="flex items-center gap-4">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                <Eye className="h-3 w-3 mr-1" />
                {Math.floor(Math.random() * 100) + 50} viewing now
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Availability</span>
              <span className="font-semibold">{availabilityPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={availabilityPercentage} className="h-2" />
          </div>
        </div>

        {/* Enhanced Image Gallery */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] md:h-[600px] relative">
            {/* Main Image with Overlay */}
            <div 
              className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
=======
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
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              onClick={() => setShowGallery(true)}
            >
              <img
                src={pg.images[0]}
                alt={pg.name}
<<<<<<< HEAD
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Maximize2 className="h-4 w-4" />
                  <span className="text-sm">Click to view fullscreen</span>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadBrochure();
                  }}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Brochure
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewOnMap();
                  }}
                >
                  <MapIcon className="h-3 w-3 mr-1" />
                  Map
                </Button>
              </div>
            </div>
            
            {/* Thumbnail Images */}
=======
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            </div>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
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
<<<<<<< HEAD
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {index === 1 && pg.images.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-display font-semibold text-lg">
=======
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                {index === 1 && pg.images.length > 3 && (
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-semibold text-lg">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      +{pg.images.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            ))}
<<<<<<< HEAD
            
            {/* Virtual Tour Button */}
            <div 
              className="hidden md:flex items-center justify-center relative rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br from-orange-500 to-amber-500"
              onClick={() => setShow360Tour(true)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10 text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Virtual 360° Tour</h3>
                <p className="text-white/80 text-sm">Explore this PG virtually</p>
              </div>
            </div>
          </div>
          
          {/* Image Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {pg.images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(index);
                  if (index === 0) {
                    // Scroll to main image
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setShowGallery(true);
                  }
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentImage ? "bg-orange-600 w-8" : "bg-gray-300"
                )}
              />
            ))}
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
          </div>
        </div>

        {/* Gallery Modal */}
        {showGallery && (
<<<<<<< HEAD
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
=======
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center z-10"
            >
              <X className="h-5 w-5" />
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
            </button>
            
            <button
              onClick={() => setCurrentImage((prev) => (prev === 0 ? pg.images.length - 1 : prev - 1))}
<<<<<<< HEAD
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <div className="relative">
              <img
                src={pg.images[currentImage]}
                alt={`${pg.name} ${currentImage + 1}`}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm">
                  {currentImage + 1} / {pg.images.length}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentImage((prev) => (prev === pg.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
=======
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
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              {pg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
<<<<<<< HEAD
                    currentImage === index ? "bg-orange-500" : "bg-white/50"
=======
                    currentImage === index ? "bg-primary" : "bg-card/50"
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                  )}
                />
              ))}
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* Virtual Tour Modal */}
        {show360Tour && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <button
              onClick={() => setShow360Tour(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            
            <div 
              ref={tourRef}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateY(${virtualTourAngle}deg)`,
                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Virtual Tour Content */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 via-amber-900/20 to-orange-900/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Virtual 360° Tour</h3>
                    <p className="text-white/80">Use buttons to navigate the tour</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <Button
                onClick={() => handleVirtualTourRotate('left')}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Rotate Left
              </Button>
              <Button
                onClick={() => handleVirtualTourRotate('right')}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                Rotate Right
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                onClick={() => setVirtualTourAngle(0)}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Reset View
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
=======
        {/* Content */}
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
<<<<<<< HEAD
              {/* Header with Enhanced Info */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-100">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className={cn(
                    "text-sm py-1 px-3",
                    pg.type === 'boys' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                    pg.type === 'girls' ? 'bg-pink-100 text-pink-700 border-pink-200' : 
                    'bg-purple-100 text-purple-700 border-purple-200'
                  )}>
                    {pg.type === 'co-ed' ? 'Co-Ed' : pg.type.charAt(0).toUpperCase() + pg.type.slice(1)}
                  </Badge>
                  {pg.verified && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
                      <BadgeCheck className="h-3 w-3" />
=======
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className={pg.type === 'boys' ? 'bg-blue-100 text-blue-700' : pg.type === 'girls' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'}>
                    {pg.type === 'co-ed' ? 'Co-Ed' : pg.type.charAt(0).toUpperCase() + pg.type.slice(1)}
                  </Badge>
                  {pg.verified && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      Verified
                    </Badge>
                  )}
                  {pg.featured && (
<<<<<<< HEAD
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 gap-1">
                      <Crown className="h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-orange-200 text-orange-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Most Viewed
                  </Badge>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {pg.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">{pg.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{pg.rating}</span>
                    <span>({pg.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>{Math.floor(Math.random() * 20) + 10} students staying</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">₹{pg.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Per Month</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{pg.distance}</div>
                    <div className="text-sm text-gray-600">From CU</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{roomDetails.length}</div>
                    <div className="text-sm text-gray-600">Room Types</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{pg.amenities.length}+</div>
                    <div className="text-sm text-gray-600">Amenities</div>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-2xl">
                  <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="amenities" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger value="rooms" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Rooms
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="location" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Location
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About this PG</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{pg.description}</p>
                    
                    {/* Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">24/7 Security</h4>
                          <p className="text-gray-600 text-sm">CCTV surveillance and security guards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Wifi className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">High-speed WiFi</h4>
                          <p className="text-gray-600 text-sm">100 Mbps unlimited internet</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Utensils className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Quality Food</h4>
                          <p className="text-gray-600 text-sm">3 meals daily + evening snacks</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Study Room</h4>
                          <p className="text-gray-600 text-sm">Dedicated 24/7 study area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Amenities Tab */}
                <TabsContent value="amenities" className="mt-6">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">All Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pg.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Check;
                      return (
                        <div key={amenity} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-sm transition-all">
                          <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Rooms Tab */}
                <TabsContent value="rooms" className="mt-6">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
                  <div className="space-y-4">
                    {roomDetails.map((room, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "bg-white border rounded-2xl p-6 cursor-pointer transition-all",
                          selectedRoom === index 
                            ? "border-orange-500 shadow-lg" 
                            : "border-gray-200 hover:border-orange-300"
                        )}
                        onClick={() => setSelectedRoom(index)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">{room.type}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={cn(
                                "text-xs",
                                room.available > 2 ? "bg-green-100 text-green-700" :
                                room.available > 0 ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              )}>
                                {room.available} available
                              </Badge>
                              <span className="text-sm text-gray-600">{room.size}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">₹{room.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">per month</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4 text-green-500" />
                            All amenities included
                          </span>
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4 text-green-500" />
                            Security deposit: ₹{Math.round(room.price * 2).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-gray-900">Student Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-gray-900">{pg.rating}</div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(pg.rating) 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "fill-gray-300 text-gray-300"
                              )} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{pg.reviewCount} reviews</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              {review.verified && (
                                <BadgeCheck className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{review.program}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-4 w-4",
                                    i < review.rating 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "fill-gray-300 text-gray-300"
                                  )} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Location Tab */}
                <TabsContent value="location" className="mt-6">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Location & Directions</h2>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{pg.address}</h3>
                          <p className="text-gray-600 mt-1">Distance: {pg.distance} from Chandigarh University main gate</p>
                          <div className="flex flex-wrap gap-3 mt-3">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-orange-300"
                              onClick={viewOnMap}
                            >
                              <Navigation className="h-4 w-4 mr-2" />
                              View on Map
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-orange-300"
                              onClick={() => toast.info('Getting directions...')}
                            >
                              <Route className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Nearby Places */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Building className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-gray-900">Nearby Markets</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Gharuan Market - 1.2 km</li>
                            <li>• Sector 115 Market - 2.5 km</li>
                            <li>• Kharar Market - 5 km</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Car className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-gray-900">Transport</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Bus Stop - 300 m</li>
                            <li>• Auto Stand - 500 m</li>
                            <li>• Taxi Service - 24/7</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-gray-900">Safety</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Police Station - 3 km</li>
                            <li>• Hospital - 4 km</li>
                            <li>• Pharmacy - 1 km</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Placeholder */}
                    <div className="h-64 bg-gradient-to-r from-orange-50 to-amber-50 flex flex-col items-center justify-center border-t">
                      <MapIcon className="h-16 w-16 text-orange-300 mb-4" />
                      <p className="text-gray-700">Interactive map showing exact location</p>
                      <Button 
                        variant="outline" 
                        className="mt-4 border-orange-300"
                        onClick={viewOnMap}
                      >
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Video Tour */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Video Tour</h2>
                    <p className="text-gray-600">Take a virtual walkthrough of the PG</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-orange-300"
                    onClick={() => setShow360Tour(true)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    360° Virtual Tour
                  </Button>
                </div>
                
                <div className="relative rounded-xl overflow-hidden bg-black">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">PG Walkthrough Video</h3>
                      <p className="text-white/80">Full property tour available</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      onClick={toggleVideoPlay}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <video ref={videoRef} className="hidden">
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-apartment-4153-large.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Column - Booking & Contact */}
            <div className="space-y-6">
              {/* Price Calculator Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-3xl font-bold text-gray-900">
                      ₹{pg.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {pg.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 line-through text-sm">
                        ₹{pg.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Percent className="h-3 w-3 mr-1" />
=======
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
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                        {Math.round((1 - pg.price / pg.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
<<<<<<< HEAD
                  
                  {/* Booking Duration Slider */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Booking Duration</span>
                      <span className="text-sm font-bold text-orange-600">{bookingMonths} months</span>
                    </div>
                    <Slider
                      value={[bookingMonths]}
                      min={1}
                      max={12}
                      step={1}
                      onValueChange={([value]) => setBookingMonths(value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 month</span>
                      <span>6 months</span>
                      <span>12 months</span>
                    </div>
                  </div>
                  
                  {/* Price Calculation */}
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base price ({bookingMonths} months)</span>
                      <span className="font-medium">₹{(pg.price * bookingMonths).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-₹{totalSavings.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total Amount</span>
                      <span className="text-orange-600">₹{calculatedPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                      Save ₹{totalSavings.toLocaleString()} with {bookingMonths} months booking
                    </div>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button 
                    onClick={handleContactOwner} 
                    size="lg" 
                    className="w-full bg-orange-600 hover:bg-orange-700 gap-2"
                  >
=======
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
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    <Phone className="h-4 w-4" />
                    Contact Owner
                  </Button>
                  
<<<<<<< HEAD
                  <Button 
                    onClick={handleWhatsAppContact} 
                    variant="outline" 
                    size="lg"
                    className="w-full border-orange-300 hover:bg-orange-50 gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Owner
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={scheduleVisit}
                      variant="outline" 
                      size="sm"
                      className="border-orange-300"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                    <Button 
                      onClick={calculateEMI}
                      variant="outline" 
                      size="sm"
                      className="border-orange-300"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate EMI
=======
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
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    </Button>
                  </div>
                </div>

                {/* Owner Info */}
<<<<<<< HEAD
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                      <span className="font-display font-bold text-white text-lg">
=======
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display font-semibold text-primary">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                        {pg.ownerName.charAt(0)}
                      </span>
                    </div>
                    <div>
<<<<<<< HEAD
                      <p className="font-bold text-gray-900">{pg.ownerName}</p>
                      <p className="text-gray-600 text-sm">Property Owner</p>
                      <div className="flex items-center gap-2 mt-1">
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">Verified Owner</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-600 hover:text-orange-600"
                      onClick={() => toast.info('Calling owner...')}
                    >
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-600 hover:text-orange-600"
                      onClick={() => window.location.href = `mailto:owner@example.com?subject=Regarding ${pg.name}`}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Response Time</p>
                      <p className="text-sm text-gray-600">Usually within 30 minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Booking Guarantee</p>
                      <p className="text-sm text-gray-600">100% refund if not satisfied</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Safe & Secure</p>
                      <p className="text-sm text-gray-600">Verified by our team</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Brochure */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
                <FileText className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-center mb-2">Download Brochure</h3>
                <p className="text-white/80 text-sm text-center mb-4">
                  Get complete details, floor plans, and pricing
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-orange-600 hover:bg-orange-50"
                  onClick={downloadBrochure}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
=======
                      <p className="font-medium text-foreground">{pg.ownerName}</p>
                      <p className="text-muted-foreground text-sm">Property Owner</p>
                    </div>
                  </div>
                </div>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              </div>
            </div>
          </div>
        </div>
      </main>
<<<<<<< HEAD

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-gray-900">Contact Owner</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={contactData.visitDate}
                    onChange={(e) => setContactData(prev => ({ ...prev, visitDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={contactData.message}
                    onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="Tell the owner about your requirements..."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Send Message
                </Button>
              </form>
              
              <p className="text-sm text-gray-500 mt-6 text-center">
                We'll share your contact details with the owner
              </p>
            </div>
          </div>
        </div>
      )}

=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
      <Footer />
    </div>
  );
};

<<<<<<< HEAD
export default PGDetail;
=======
export default PGDetail;
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
