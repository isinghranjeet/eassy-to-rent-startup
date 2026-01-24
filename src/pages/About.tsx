<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Shield, Users, MapPin, Award, Phone, Mail, Globe, 
  Heart, Star, Video, CheckCircle, Home, Clock, 
  ThumbsUp, Map, MailIcon, ChevronDown, ChevronUp,
  PhoneCall, X, Linkedin, Twitter, Instagram, ExternalLink,
<<<<<<< HEAD
  GraduationCap, Briefcase, Calendar, MapPin as MapPinIcon,
  Zap, BatteryCharging, Wifi, Dumbbell, Utensils, Lock,
  Wind, Droplets, Volume2, Bot, MessageCircle, Send,
  Download, FileText, Users as UsersIcon, BookOpen, Target, TrendingUp,
  Building, Sparkles, CheckSquare, Eye, PhoneIncoming, MessageSquare
=======
  GraduationCap, Briefcase, Calendar, MapPin as MapPinIcon
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PGCard } from '@/components/pg/PGCard';
import { pgListings } from '@/lib/data/pgData';
<<<<<<< HEAD
import { toast } from 'sonner';
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d

const About = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);
<<<<<<< HEAD
  const [currentFeature, setCurrentFeature] = useState(0);
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I\'m your PG assistant. How can I help you find the perfect accommodation?', time: '10:00 AM' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Phone number (hidden from screen but fully functional)
  const supportPhone = '9315058665'; // Your actual number
  const whatsappNumber = '9315058665'; // WhatsApp number
  const supportEmail = 'support@cupgfinder.com';

  // Features Carousel Data
  const features = [
    { 
      id: 1,
      title: 'Smart Matching Algorithm', 
      description: 'AI-powered matching based on your budget, preferences, and proximity to campus',
      icon: Bot,
      color: 'from-orange-500 to-amber-500',
      stats: '95% match accuracy'
    },
    { 
      id: 2,
      title: 'Virtual 360° Tours', 
      description: 'Explore PGs virtually before visiting with our immersive 360° technology',
      icon: Eye,
      color: 'from-amber-500 to-orange-500',
      stats: '500+ virtual tours'
    },
    { 
      id: 3,
      title: 'Real-time Availability', 
      description: 'Live updates on room availability with instant booking confirmation',
      icon: Clock,
      color: 'from-orange-600 to-red-500',
      stats: 'Updated every 5 mins'
    },
    { 
      id: 4,
      title: 'Safety Score System', 
      description: 'Every PG gets a safety score based on 20+ security parameters',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      stats: '50+ safety checks'
    },
    { 
      id: 5,
      title: 'Community Reviews', 
      description: 'Authentic reviews from current and former residents',
      icon: Users,
      color: 'from-orange-400 to-yellow-500',
      stats: '10,000+ reviews'
    },
    { 
      id: 6,
      title: 'Price Predictor', 
      description: 'AI predicts price trends to help you get the best deal',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-400',
      stats: '90% accuracy rate'
    },
    { 
      id: 7,
      title: 'Amenity Finder', 
      description: 'Filter PGs by specific amenities you need',
      icon: Wifi,
      color: 'from-orange-500 to-pink-500',
      stats: '30+ amenities'
    },
    { 
      id: 8,
      title: 'Roommate Finder', 
      description: 'Connect with compatible roommates based on lifestyle',
      icon: UsersIcon,
      color: 'from-pink-500 to-orange-500',
      stats: '5,000+ matches'
    },
    { 
      id: 9,
      title: 'Study Environment Rating', 
      description: 'Rate PGs based on study-friendly environment',
      icon: BookOpen,
      color: 'from-orange-600 to-purple-500',
      stats: 'Study score system'
    },
    { 
      id: 10,
      title: 'Distance Optimizer', 
      description: 'Find PGs with optimal distance to your department',
      icon: Target,
      color: 'from-purple-500 to-orange-600',
      stats: 'Department-specific'
    }
  ];

=======

  // Add your phone number here
  const supportPhone = '+91-9876543210'; // Replace with your actual phone number
  const supportEmail = 'support@cupgfinder.com';

>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
  // Dynamic Stats
  const stats = [
    { value: '500+', label: 'Verified PGs', icon: CheckCircle, color: 'text-emerald-500' },
    { value: '10K+', label: 'Happy Students', icon: Users, color: 'text-amber-500' },
<<<<<<< HEAD
    { value: '50+', label: 'Locations', icon: MapPin, color: 'text-orange-500' },
=======
    { value: '50+', label: 'Locations', icon: MapPin, color: 'text-blue-500' },
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
    { value: '4.8/5', label: 'Avg Rating', icon: Star, color: 'text-yellow-500' },
    { value: '24/7', label: 'Support', icon: Clock, color: 'text-purple-500' },
    { value: '100+', label: 'Team Members', icon: Heart, color: 'text-rose-500' },
  ];

  // Core Values
  const values = [
    { 
      icon: Shield, 
      title: 'Trust & Safety', 
      description: 'Every PG listing is personally verified for security and safety standards.',
<<<<<<< HEAD
      gradient: 'from-orange-500 to-amber-500'
=======
      gradient: 'from-blue-500 to-cyan-500'
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
    },
    { 
      icon: Users, 
      title: 'Student First', 
      description: 'Built by students, for students. We understand your needs perfectly.',
<<<<<<< HEAD
      gradient: 'from-emerald-500 to-orange-400'
=======
      gradient: 'from-emerald-500 to-green-500'
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
    },
    { 
      icon: MapPin, 
      title: 'Local Expertise', 
      description: 'Deep knowledge of CU campus and surrounding areas for best recommendations.',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      icon: Award, 
      title: 'Quality Assured', 
      description: 'Only PGs meeting our strict quality standards make it to our platform.',
<<<<<<< HEAD
      gradient: 'from-purple-500 to-orange-500'
=======
      gradient: 'from-purple-500 to-pink-500'
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
    },
    { 
      icon: Home, 
      title: 'Home Away From Home', 
      description: 'We prioritize comfort and create environments where students thrive.',
<<<<<<< HEAD
      gradient: 'from-rose-500 to-orange-400'
=======
      gradient: 'from-rose-500 to-red-500'
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
    },
    { 
      icon: ThumbsUp, 
      title: 'Top Rated', 
      description: 'Curated selection of highest-rated PGs based on student feedback.',
<<<<<<< HEAD
      gradient: 'from-orange-600 to-amber-500'
    },
  ];

  // Team Members
  const team = [
    { 
      id: 1,
      name: 'Ranjeet Kumar', 
      role: 'Founder & CEO', 
      image: 'https://media.licdn.com/dms/image/v2/D5603AQGDt02qOvcBMA/profile-displayphoto-shrink_400_400/B56ZUh8ITVHEAs-/0/1740031169550?e=1770854400&v=beta&t=eaQJID_DcpcBWVtiME6wCtmW50vRkj53owSHSaxT4aQ',
      shortDescription: 'CU Alumni passionate about solving student accommodation problems.',
      fullBio: 'Ranjeet is a Computer Science graduate from CU ( batch). His personal struggle with finding safe accommodation during college inspired him to start CU PG Finder. With 5+ years of experience in the ed-tech space, he leads our vision to make student housing stress-free.',
      education: 'B.Tech Computer Science, CU (2018)',
      experience: 'current b.tech  student & Student Services',
      location: 'New Delhi, India',
      joinDate: 'March 2022',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ranjeet-kumar-37016128b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        twitter: 'https://twitter.com/amitkumar',
        instagram: 'https://instagram.com/isinghranjeet_'
=======
      gradient: 'from-indigo-500 to-blue-500'
    },
  ];

  // Team Members with detailed information
  const team = [
    { 
      id: 1,
      name: 'Amit Kumar', 
      role: 'Founder & CEO', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      shortDescription: 'CU Alumni passionate about solving student accommodation problems.',
      fullBio: 'Amit is a Computer Science graduate from CU (2018 batch). His personal struggle with finding safe accommodation during college inspired him to start CU PG Finder. With 5+ years of experience in the ed-tech space, he leads our vision to make student housing stress-free.',
      education: 'B.Tech Computer Science, CU (2018)',
      experience: '5+ years in Ed-Tech & Student Services',
      location: 'New Delhi, India',
      joinDate: 'March 2022',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/amitkumar',
        twitter: 'https://twitter.com/amitkumar',
        instagram: 'https://instagram.com/amitkumar'
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
      },
      achievements: [
        'Featured in "Young Entrepreneurs of India" 2023',
        'Successfully helped 10,000+ students find accommodation',
        'Built a team of 100+ dedicated professionals'
      ]
    },
    { 
      id: 2,
<<<<<<< HEAD
      name: 'Satyam Kumar', 
      role: 'Head of Operations', 
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      shortDescription: 'Ensures every PG listing meets our quality standards.',
      fullBio: 'Satyam brings 8 years of experience in hospitality and operations management. She oversees our verification process, ensuring every PG listed meets our 50+ point quality checklist. Her attention to detail has earned us the "Most Trusted Platform" award.',
      education: 'information technology in Operations, IIM Ahmedabad',
=======
      name: 'Priya Sharma', 
      role: 'Head of Operations', 
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      shortDescription: 'Ensures every PG listing meets our quality standards.',
      fullBio: 'Priya brings 8 years of experience in hospitality and operations management. She oversees our verification process, ensuring every PG listed meets our 50+ point quality checklist. Her attention to detail has earned us the "Most Trusted Platform" award.',
      education: 'MBA in Operations, IIM Ahmedabad',
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
      experience: '8+ years in Hospitality & Operations',
      location: 'Mumbai, India',
      joinDate: 'June 2022',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/priyasharma',
        twitter: 'https://twitter.com/priyasharma',
        instagram: 'https://instagram.com/priyasharma'
      },
      achievements: [
        'Reduced verification time by 60%',
        'Implemented quality standards across 500+ PGs',
        'Trained 50+ verification officers'
      ]
    },
    { 
      id: 3,
<<<<<<< HEAD
      name: 'Prakash Jha', 
      role: 'Student Relations Head', 
      image: 'https://media.licdn.com/dms/image/v2/D5603AQFux8u3K-yXdQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727537784489?e=1770854400&v=beta&t=htx82OKoRSykJXALd9hsoFDHwVTX_6vSzFGHGaD757w',
      shortDescription: 'Your go-to person for any accommodation-related queries.',
      fullBio: 'Prakash  is a recent CU graduate who understands student needs intimately. He leads our student support team and ensures every query is resolved within 2 hours. His friendly approach has earned him the nickname "PG Guru" among students.',
      education: 'B.Tech , CU (2027)',
=======
      name: 'Rohan Mehta', 
      role: 'Student Relations Head', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      shortDescription: 'Your go-to person for any accommodation-related queries.',
      fullBio: 'Rohan is a recent CU graduate who understands student needs intimately. He leads our student support team and ensures every query is resolved within 2 hours. His friendly approach has earned him the nickname "PG Guru" among students.',
      education: 'B.Com Honors, CU (2021)',
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
      experience: '3+ years in Customer Relations',
      location: 'Delhi, India',
      joinDate: 'August 2022',
      socialLinks: {
<<<<<<< HEAD
        linkedin: 'https://www.linkedin.com/in/prakash-kumar-ab33a6289',
        twitter: 'https://twitter.com/rohanmehta',
        instagram: 'Prakash_K138- instagram'
=======
        linkedin: 'https://linkedin.com/in/rohanmehta',
        twitter: 'https://twitter.com/rohanmehta',
        instagram: 'https://instagram.com/rohanmehta'
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
      },
      achievements: [
        'Maintained 98% student satisfaction rate',
        'Built a community of 5,000+ student ambassadors',
        'Resolved 15,000+ student queries'
      ]
    },
  ];

  // FAQ Data
  const faqs = [
    { 
      q: 'How do I book a PG?', 
      a: 'Simply browse through our verified listings, view details, and contact the owner directly via Call or WhatsApp. We also offer booking assistance through our support team.' 
    },
    { 
      q: 'Are the listings verified?', 
      a: 'Yes! Every PG is personally verified by our team. We check safety, amenities, cleanliness, and owner credibility before listing.' 
    },
    { 
      q: 'What amenities are included?', 
      a: 'Most PGs include WiFi, AC, meals, laundry, parking, and CCTV. Premium listings offer gym access, study rooms, recreational areas, and 24/7 security.' 
    },
    { 
      q: 'Can I visit before booking?', 
      a: 'Absolutely! We encourage site visits and can arrange virtual tours for out-of-town students.' 
    },
  ];

<<<<<<< HEAD
  // Amenities showcase
  const amenities = [
    { icon: Wifi, label: 'High-speed WiFi', color: 'bg-blue-100 text-blue-600' },
    { icon: BatteryCharging, label: 'Power Backup', color: 'bg-green-100 text-green-600' },
    { icon: Dumbbell, label: 'Gym Access', color: 'bg-purple-100 text-purple-600' },
    { icon: Utensils, label: 'Quality Food', color: 'bg-rose-100 text-rose-600' },
    { icon: Lock, label: '24/7 Security', color: 'bg-amber-100 text-amber-600' },
    { icon: Wind, label: 'AC Rooms', color: 'bg-cyan-100 text-cyan-600' },
    { icon: Droplets, label: 'Hot Water', color: 'bg-indigo-100 text-indigo-600' },
    { icon: Volume2, label: 'Study Rooms', color: 'bg-emerald-100 text-emerald-600' },
  ];

  useEffect(() => {
    // Auto rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const openTeamMemberProfile = (id: number) => {
    setSelectedTeamMember(id);
<<<<<<< HEAD
    document.body.style.overflow = 'hidden';
=======
    document.body.style.overflow = 'hidden'; // Prevent scrolling
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
  };

  const closeTeamMemberProfile = () => {
    setSelectedTeamMember(null);
<<<<<<< HEAD
    document.body.style.overflow = 'auto';
=======
    document.body.style.overflow = 'auto'; // Re-enable scrolling
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
  };

  const selectedMember = team.find(member => member.id === selectedTeamMember);

<<<<<<< HEAD
  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent(whatsappMessage || 'Hello, I need assistance finding PG accommodation near Chandigarh University.');
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    toast.success('Opening WhatsApp...');
    setWhatsappMessage('');
  };

  const sendChatMessage = () => {
    if (!whatsappMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: whatsappMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setWhatsappMessage('');
    
    setTimeout(() => {
      const responses = [
        "Great! I can help you find PGs with those requirements. What's your budget range?",
        "Perfect! Let me show you some verified PGs in that area. Any specific amenities you're looking for?",
        "Thanks for sharing! I'll filter the best options for you. Would you like AC or non-AC rooms?",
        "Noted! I have several options matching your criteria. Should I send you the details on WhatsApp?"
      ];
      
      const botResponse = {
        id: chatMessages.length + 2,
        sender: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const downloadBrochure = () => {
    toast.success('Brochure download started!', {
      description: 'Your PG guide will download shortly.',
      duration: 3000,
    });
    // In real implementation, trigger actual download
  };

  const CurrentFeatureIcon = features[currentFeature].icon;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50/50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-orange-800/80 to-amber-900/70" />
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-university-students-walking-through-the-campus-3320-large.mp4" type="video/mp4" />
              {/* Fallback image */}
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop" 
                alt="University Campus" 
                className="w-full h-full object-cover"
              />
            </video>
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
              Trusted by 10,000+ CU Students
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Perfect PG Journey
              <span className="block text-3xl md:text-4xl text-orange-200 mt-4">Starts Here</span>
            </h1>
            <p className="text-orange-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
=======
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50/50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
          <div className="container relative mx-auto px-4 text-center">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
              Trusted by 10,000+ Students
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Perfect PG Journey
              <span className="block text-3xl md:text-4xl text-primary-foreground/90 mt-4">Starts Here</span>
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              We're more than just a platform - we're your trusted companion in finding safe, comfortable, 
              and affordable accommodation near CU campus. Where comfort meets convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
<<<<<<< HEAD
                variant="default" 
                size="lg" 
                className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-orange-600 hover:bg-orange-700"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Features
=======
                variant="primary" 
                size="lg" 
                className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('featured-pgs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Featured PGs
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg border-2 border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                onClick={() => setShowVideo(true)}
              >
                <Video className="h-5 w-5 mr-2" />
                Watch Our Story
              </Button>
            </div>
<<<<<<< HEAD
            
            {/* Quick Contact Icons */}
            <div className="mt-12 flex justify-center gap-6">
              <a 
                href={`tel:${supportPhone}`}
                className="flex flex-col items-center group"
                title="Call Support"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <PhoneCall className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-white/80 mt-2">Call Support</span>
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                title="WhatsApp"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-white/80 mt-2">WhatsApp</span>
              </a>
              <button 
                onClick={() => setChatOpen(true)}
                className="flex flex-col items-center group"
                title="Live Chat"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-white/80 mt-2">Live Chat</span>
              </button>
            </div>
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
<<<<<<< HEAD
            <div className="bg-gradient-to-br from-white via-white to-orange-50 rounded-3xl p-8 shadow-2xl shadow-orange-100 border border-orange-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
=======
            <div className="bg-gradient-to-br from-white via-white to-primary/5 rounded-3xl p-8 shadow-2xl shadow-primary/10 border border-primary/10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              {stats.map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="group animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-center mb-3">
<<<<<<< HEAD
                    <div className={`p-3 rounded-2xl bg-gradient-to-br from-white to-orange-50 shadow-lg group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
=======
                    <div className={`p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                </div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Features Section */}
        <section id="features" ref={featuresRef} className="py-20 bg-gradient-to-b from-white to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">Innovative Features</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-orange-600">10 Powerful Features</span> For Smart PG Hunting
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We use cutting-edge technology to make your accommodation search effortless
              </p>
            </div>

            {/* Features Carousel */}
            <div className="relative mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {features.slice(currentFeature, currentFeature + 5).map((feature) => (
                  <div 
                    key={feature.id} 
                    className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit`}>
                      {feature.icon && <feature.icon className="h-6 w-6 text-white" />}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                      {feature.stats}
                    </Badge>
                  </div>
                ))}
              </div>
              
              {/* Feature Navigation Dots */}
              <div className="flex justify-center gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentFeature ? 'bg-orange-600 w-8' : 'bg-orange-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Feature Details */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 border border-orange-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                  {CurrentFeatureIcon && <CurrentFeatureIcon className="h-8 w-8 text-white" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{features[currentFeature].title}</h3>
                  <p className="text-orange-600 font-medium">{features[currentFeature].stats}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-8">{features[currentFeature].description}</p>
              <Button 
                variant="default" 
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => toast.info('Feature demo requested')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Try This Feature
              </Button>
            </div>
          </div>
        </section>



        

=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
<<<<<<< HEAD
                <Badge variant="outline" className="mb-4 bg-orange-50 text-orange-700 border-orange-200">Our Journey</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                  From Frustration to<span className="text-orange-600"> Solution</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
=======
                <Badge variant="outline" className="mb-4">Our Journey</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  From Frustration to<span className="text-primary"> Solution</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                  <p>
                    CU PG Finder was born in 2022 from a simple observation: finding reliable, 
                    affordable accommodation near campus shouldn't be a struggle for students.
                  </p>
                  <p>
                    What started as a small initiative to help fellow students has grown into a 
                    trusted platform helping thousands find their perfect home away from home.
                  </p>
<<<<<<< HEAD
                  <p className="font-semibold text-gray-900">
=======
                  <p className="font-semibold text-foreground">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    Today, we're proud to be the most trusted PG finding platform for CU students.
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
<<<<<<< HEAD
                  <Button 
                    variant="default" 
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => setShowVideo(true)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Our Story Video
                  </Button>
                  <Button variant="outline" className="border-orange-300 hover:border-orange-400">Read Founder's Note</Button>
=======
                  <Button variant="primary" onClick={() => setShowVideo(true)}>
                    <Video className="h-4 w-4 mr-2" />
                    Our Story Video
                  </Button>
                  <Button variant="outline">Read Founder's Note</Button>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" 
                    alt="Student Community" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-bold">10,000+ Success Stories</div>
                    <div className="text-sm">and counting...</div>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
=======
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              </div>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative w-[95%] md:w-[85%] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Our Story Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={() => setShowVideo(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

<<<<<<< HEAD

{/* Video Modal */}
{showVideo && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
    <div className="relative w-[95%] md:w-[85%] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">

      <iframe
        src="https://www.youtube.com/embed/9No-FiEInLA?autoplay=1"
        title="Student Housing Platform Overview"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
        onClick={() => setShowVideo(false)}
      >
        <X className="h-5 w-5" />
      </button>

    </div>
  </div>
)}

        {/* Amenities Showcase */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">Premium Amenities</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our PGs Offer
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                All verified PGs include these essential amenities for comfortable student living
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {amenities.map((amenity, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`p-4 rounded-full ${amenity.color} mb-4`}>
                    <amenity.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-gray-900 text-center">{amenity.label}</span>
=======
        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Our Promise</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Core Values That Drive Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to making your accommodation search experience seamless and stress-free
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div 
                  key={value.title} 
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${value.gradient} w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-sm text-primary font-semibold">Learn more →</div>
                  </div>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                </div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
       






        {/* WhatsApp Quick Inquiry */}
        <section className="py-20 bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366]/10 mb-4">
                  <MessageCircle className="h-8 w-8 text-[#25D366]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Quick Inquiry</h3>
                <p className="text-gray-600">Get instant assistance via WhatsApp</p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="Type your inquiry here..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && sendWhatsAppMessage()}
                  />
                  <Button 
                    onClick={sendWhatsAppMessage}
                    disabled={!whatsappMessage.trim()}
                    className="bg-[#25D366] hover:bg-[#128C7E]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    or click below to start a conversation
                  </p>
                  <a 
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-[#25D366] hover:text-[#128C7E] font-medium"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Open WhatsApp Chat
                  </a>
                </div>
              </div>
=======
        {/* Featured PGs */}
        <section id="featured-pgs" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Premium Selection</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured PG Accommodations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked PGs with top ratings and premium amenities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pgListings.slice(0, 3).map((pg, index) => (
                <div 
                  key={pg.id} 
                  className="transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <PGCard pg={pg} index={index} />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="primary" size="lg" className="px-8">
                View All PGs
              </Button>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
            </div>
          </div>
        </section>

<<<<<<< HEAD




{/* Download Brochure */}
<section className="py-24">
  <div className="container mx-auto px-4">
    <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-12 text-center text-white overflow-hidden shadow-2xl">

      {/* Decorative Background */}
      <div className="absolute -top-20 -right-20 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-white/10 rounded-full blur-3xl" />

      <FileText className="h-16 w-16 mx-auto mb-6 opacity-90" />

      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        PG Booking Guide
      </h3>

      <p className="text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
        A formal, founder-written guide explaining how to book a PG safely,
        what to verify before payment, and how to avoid common student mistakes
        near Chandigarh University.
      </p>

      {/* Founder Info */}
      <div className="max-w-3xl mx-auto mb-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
        <h4 className="text-xl font-semibold mb-2">Message from the Founder</h4>
        <p className="text-orange-100 leading-relaxed">
          I’m <span className="text-white font-semibold">Ranjeet Singh</span>, Founder of this platform.
          This guide is created to help students make informed, transparent,
          and safe PG booking decisions.
        </p>
      </div>

      {/* Download Button */}
      <Button
        variant="secondary"
        size="lg"
        className="bg-white text-orange-600 hover:bg-orange-50 px-10 py-6 text-lg shadow-xl"
        onClick={downloadBrochure}
      >
        <Download className="h-5 w-5 mr-2" />
        Download Free Guide (PDF)
      </Button>

      <p className="mt-4 text-sm text-orange-100">
        ✔ Free • ✔ Student-Focused • ✔ Founder Written
      </p>

    </div>
  </div>
</section>


        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-orange-200 text-orange-700">Student Voices</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Students Say About Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
=======
        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Student Voices</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Students Say About Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                Real experiences from our student community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Sakshi R.', 
                  feedback: 'Found a safe and cozy PG just 10 mins from campus! The verification process gave me peace of mind.',
                  role: 'Computer Science, 3rd Year',
                  rating: 5
                },
                { 
                  name: 'Ankit S.', 
                  feedback: 'Highly recommend CU PG Finder. They helped me find a PG with all amenities within my budget.',
                  role: 'Business Administration, 2nd Year',
                  rating: 5
                },
                { 
                  name: 'Priya M.', 
                  feedback: 'Excellent support team and verified listings. Saved me weeks of search time!',
                  role: 'Engineering, 4th Year',
                  rating: 5
                },
              ].map((testimonial, i) => (
                <div 
                  key={testimonial.name} 
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
<<<<<<< HEAD
                  <p className="italic text-gray-600 mb-6 leading-relaxed">"{testimonial.feedback}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
=======
                  <p className="italic text-muted-foreground mb-6 leading-relaxed">"{testimonial.feedback}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
      {/* FAQ Section */}
<section className="py-24 bg-gradient-to-b from-orange-50/40 to-white">
  <div className="container mx-auto px-4 max-w-4xl">
    
    {/* Heading */}
    <div className="text-center mb-16">
      <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
        Got Questions?
      </Badge>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Everything you need to know about PG booking, facilities, and stay near CU
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-6">
      {faqs.map((faq, index) => {
        const isOpen = expandedFaq === index;

        return (
          <div
            key={index}
            className={`group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden
              ${isOpen 
                ? "border-orange-300 shadow-xl" 
                : "border-gray-200 hover:border-orange-300 hover:shadow-lg"}
            `}
          >
            {/* Left Accent Bar */}
            <div
              className={`absolute left-0 top-0 h-full w-1 transition-colors duration-300
                ${isOpen ? "bg-orange-500" : "bg-transparent group-hover:bg-orange-400"}
              `}
            />

            {/* Question */}
            <button
              className="w-full text-left p-6 pr-8 flex items-center justify-between gap-4"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold text-sm">
                  {index + 1}
                </div>

                <span className="font-display font-semibold text-lg text-gray-900 group-hover:text-orange-700 transition-colors">
                  {faq.q}
                </span>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-orange-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-orange-600 transition-colors" />
                )}
              </div>
            </button>

            {/* Answer */}
            <div
              className={`grid transition-all duration-300 ease-in-out
                ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
              `}
            >
              <div className="overflow-hidden px-6 pb-6 pl-16">
                <p className="text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

  </div>
</section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-b from-white to-orange-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">Meet The Team</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Faces Behind CU PG Finder
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
=======
        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <Badge className="mb-4">Got Questions?</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common queries
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/30 transition-colors duration-300"
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-display font-semibold text-lg text-foreground">{faq.q}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Meet The Team</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Faces Behind CU PG Finder
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                Passionate individuals dedicated to solving student accommodation challenges
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <div 
                  key={member.id} 
                  className="group text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
<<<<<<< HEAD
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{member.name}</h3>
                  <div className="text-orange-600 font-semibold mb-4">{member.role}</div>
                  <p className="text-gray-600 text-sm mb-6">{member.shortDescription}</p>
=======
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{member.name}</h3>
                  <div className="text-primary font-semibold mb-4">{member.role}</div>
                  <p className="text-muted-foreground text-sm mb-6">{member.shortDescription}</p>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                  <div className="flex justify-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
<<<<<<< HEAD
                      className="border-orange-300 hover:border-orange-400"
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      onClick={() => window.location.href = `mailto:${supportEmail}?subject=Contact ${member.name}`}
                    >
                      Contact
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
<<<<<<< HEAD
                      className="text-orange-600 hover:text-orange-700"
=======
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      onClick={() => openTeamMemberProfile(member.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Member Profile Modal */}
        {selectedTeamMember && selectedMember && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={closeTeamMemberProfile}
            />
            
            {/* Modal Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-3xl p-6 flex justify-between items-center">
                  <div>
<<<<<<< HEAD
                    <h2 className="font-display text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                    <p className="text-orange-600 font-semibold">{selectedMember.role}</p>
=======
                    <h2 className="font-display text-2xl font-bold text-foreground">{selectedMember.name}</h2>
                    <p className="text-primary font-semibold">{selectedMember.role}</p>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                  </div>
                  <button 
                    onClick={closeTeamMemberProfile}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name}
                        className="w-48 h-48 rounded-2xl object-cover border-4 border-white shadow-lg mx-auto md:mx-0"
                      />
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
<<<<<<< HEAD
                      <p className="text-gray-600 mb-6 leading-relaxed">{selectedMember.fullBio}</p>
=======
                      <p className="text-muted-foreground mb-6 leading-relaxed">{selectedMember.fullBio}</p>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      
                      {/* Social Links */}
                      <div className="flex gap-4 mb-6">
                        <a 
                          href={selectedMember.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a 
                          href={selectedMember.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a 
                          href={selectedMember.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      </div>

                      {/* Contact Button */}
                      <Button 
<<<<<<< HEAD
                        variant="default"
                        className="bg-orange-600 hover:bg-orange-700 mb-6"
                        onClick={() => window.location.href = `mailto:${supportEmail}?subject=Contact ${selectedMember.name}`}
=======
                        variant="primary"
                        onClick={() => window.location.href = `mailto:${supportEmail}?subject=Contact ${selectedMember.name}`}
                        className="mb-6"
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact {selectedMember.name.split(' ')[0]}
                      </Button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<<<<<<< HEAD
                    <div className="bg-orange-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <GraduationCap className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-display font-semibold text-gray-900">Education</h3>
                      </div>
                      <p className="text-gray-600">{selectedMember.education}</p>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Briefcase className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-display font-semibold text-gray-900">Experience</h3>
                      </div>
                      <p className="text-gray-600">{selectedMember.experience}</p>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <MapPinIcon className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-display font-semibold text-gray-900">Location</h3>
                      </div>
                      <p className="text-gray-600">{selectedMember.location}</p>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Calendar className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-display font-semibold text-gray-900">Joined</h3>
                      </div>
                      <p className="text-gray-600">{selectedMember.joinDate}</p>
=======
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground">Education</h3>
                      </div>
                      <p className="text-muted-foreground">{selectedMember.education}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground">Experience</h3>
                      </div>
                      <p className="text-muted-foreground">{selectedMember.experience}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPinIcon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground">Location</h3>
                      </div>
                      <p className="text-muted-foreground">{selectedMember.location}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground">Joined</h3>
                      </div>
                      <p className="text-muted-foreground">{selectedMember.joinDate}</p>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    </div>
                  </div>

                  {/* Achievements */}
<<<<<<< HEAD
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mb-8">
                    <h3 className="font-display font-semibold text-xl text-gray-900 mb-4">Key Achievements</h3>
=======
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-8">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4">Key Achievements</h3>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    <ul className="space-y-3">
                      {selectedMember.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
<<<<<<< HEAD
                          <span className="text-gray-600">{achievement}</span>
=======
                          <span className="text-muted-foreground">{achievement}</span>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Contact Info */}
<<<<<<< HEAD
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
                    <h3 className="font-display font-semibold text-xl text-gray-900 mb-4">Get in Touch</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={`tel:${supportPhone}`}
                        className="flex items-center justify-center gap-2 bg-white border border-orange-300 rounded-lg px-6 py-3 hover:bg-orange-50 transition-colors"
                      >
                        <PhoneCall className="h-5 w-5 text-orange-600" />
=======
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4">Get in Touch</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={`tel:${supportPhone}`}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <PhoneCall className="h-5 w-5 text-primary" />
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                        <span className="font-medium">Call Support</span>
                      </a>
                      <a 
                        href={`mailto:${supportEmail}?subject=Regarding ${selectedMember.name}`}
<<<<<<< HEAD
                        className="flex items-center justify-center gap-2 bg-orange-600 text-white rounded-lg px-6 py-3 hover:bg-orange-700 transition-colors"
=======
                        className="flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors"
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                      >
                        <Mail className="h-5 w-5" />
                        <span className="font-medium">Email {selectedMember.name.split(' ')[0]}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
<<<<<<< HEAD
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
        Our Coverage
      </Badge>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        PG Locations Across Campus
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Find accommodation in all popular student areas near Chandigarh University
      </p>
    </div>

    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-orange-200">
      <iframe
        title="Chandigarh University Map"
        src="https://www.google.com/maps?q=Chandigarh+University+Punjab&output=embed"
        className="w-full h-[500px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Campus Label */}
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="font-semibold text-gray-900">Chandigarh University</div>
        <div className="text-sm text-gray-600">Gharuan, Punjab</div>
      </div>
    </div>
  </div>
</section>
=======
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Coverage</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                PG Locations Across Campus
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find accommodation in all popular student areas near CU
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="h-[500px] bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center relative">
                <Map className="h-24 w-24 text-primary/30 mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Interactive Map Coming Soon</h3>
                <p className="text-muted-foreground mb-8 max-w-md text-center">
                  We're building an interactive map to help you visualize PG locations, distances from campus, and nearby amenities.
                </p>
                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  View Area Guide
                </Button>
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="font-semibold">CU Campus</div>
                  <div className="text-sm text-muted-foreground">Central Location</div>
                </div>
              </div>
            </div>
          </div>
        </section>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d

        {/* Newsletter */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
<<<<<<< HEAD
            <div className="bg-gradient-to-r from-orange-50 via-orange-50/50 to-orange-50 rounded-3xl p-12 text-center border border-orange-200">
              <MailIcon className="h-12 w-12 text-orange-600 mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Stay Updated on New Listings
              </h2>
              <p className="text-gray-600 mb-8">
=======
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12 text-center border border-primary/20">
              <MailIcon className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Stay Updated on New Listings
              </h2>
              <p className="text-muted-foreground mb-8">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                Subscribe to get notified about new PG listings, special offers, and accommodation tips.
              </p>
              {isSubscribed ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 animate-fade-in">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <div className="font-display text-xl font-bold text-emerald-700 mb-2">Successfully Subscribed!</div>
                  <p className="text-emerald-600">You'll receive updates on new PG listings.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    required
<<<<<<< HEAD
                    className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                  <Button type="submit" variant="default" className="px-8 py-4 text-lg bg-orange-600 hover:bg-orange-700">
=======
                    className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <Button type="submit" variant="primary" className="px-8 py-4 text-lg">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                    Subscribe
                  </Button>
                </form>
              )}
<<<<<<< HEAD
              <p className="text-sm text-gray-500 mt-6">
=======
              <p className="text-sm text-muted-foreground mt-6">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
                No spam ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Live Chat Widget */}
        {chatOpen && (
          <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-orange-200 z-50">
            <div className="p-4 border-b bg-orange-50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">PG Assistant</h3>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Online - Smart matching available
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  placeholder="Ask about PG availability, prices, amenities..."
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
                <Button 
                  onClick={sendChatMessage}
                  disabled={!whatsappMessage.trim()}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Type "whatsapp" to connect with human agent
              </p>
            </div>
          </div>
        )}

        {/* Live Chat Button */}
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-40"
          title="AI PG Assistant"
        >
          <Bot className="h-6 w-6 text-white" />
        </button>

        {/* WhatsApp Float Button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-24 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-40"
          title="WhatsApp Support"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </a>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
=======
        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Ready to Find Your Perfect PG?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of students who found their ideal accommodation through CU PG Finder
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
<<<<<<< HEAD
              {/* <Button 
                variant="secondary" 
                size="lg" 
                className="px-10 py-6 text-lg font-semibold shadow-lg bg-white text-orange-600 hover:bg-orange-50"
                onClick={() => document.getElementById('featured-pgs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse All PGs
              </Button> */}
=======
              <Button 
                variant="secondary" 
                size="lg" 
                className="px-10 py-6 text-lg font-semibold shadow-lg"
                onClick={() => document.getElementById('featured-pgs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse All PGs
              </Button>
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              <a href={`tel:${supportPhone}`} className="inline-block">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-10 py-6 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white/10 w-full sm:w-auto"
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
<<<<<<< HEAD
                  Call Support: Click to Call
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
=======
                  Call Support: {supportPhone}
                </Button>
              </a>
            </div>
            <div className="mt-8">
>>>>>>> 2d5efcac071c5936f401cffa8b6f3beecc267b5d
              <a 
                href={`mailto:${supportEmail}`} 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{supportEmail}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;