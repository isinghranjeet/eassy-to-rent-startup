import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Shield, Users, MapPin, Award, Phone, Mail, Globe, 
  Heart, Star, Video, CheckCircle, Home, Clock, 
  ThumbsUp, Map, MailIcon, ChevronDown, ChevronUp,
  PhoneCall, X, Linkedin, Twitter, Instagram, ExternalLink,
  GraduationCap, Briefcase, Calendar, MapPin as MapPinIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PGCard } from '@/components/pg/PGCard';
import { pgListings } from '@/lib/data/pgData';

const About = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);

  // Add your phone number here
  const supportPhone = '+91-9876543210'; // Replace with your actual phone number
  const supportEmail = 'support@cupgfinder.com';

  // Dynamic Stats
  const stats = [
    { value: '500+', label: 'Verified PGs', icon: CheckCircle, color: 'text-emerald-500' },
    { value: '10K+', label: 'Happy Students', icon: Users, color: 'text-amber-500' },
    { value: '50+', label: 'Locations', icon: MapPin, color: 'text-blue-500' },
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
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Users, 
      title: 'Student First', 
      description: 'Built by students, for students. We understand your needs perfectly.',
      gradient: 'from-emerald-500 to-green-500'
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
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Home, 
      title: 'Home Away From Home', 
      description: 'We prioritize comfort and create environments where students thrive.',
      gradient: 'from-rose-500 to-red-500'
    },
    { 
      icon: ThumbsUp, 
      title: 'Top Rated', 
      description: 'Curated selection of highest-rated PGs based on student feedback.',
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
      },
      achievements: [
        'Featured in "Young Entrepreneurs of India" 2023',
        'Successfully helped 10,000+ students find accommodation',
        'Built a team of 100+ dedicated professionals'
      ]
    },
    { 
      id: 2,
      name: 'Priya Sharma', 
      role: 'Head of Operations', 
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      shortDescription: 'Ensures every PG listing meets our quality standards.',
      fullBio: 'Priya brings 8 years of experience in hospitality and operations management. She oversees our verification process, ensuring every PG listed meets our 50+ point quality checklist. Her attention to detail has earned us the "Most Trusted Platform" award.',
      education: 'MBA in Operations, IIM Ahmedabad',
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
      name: 'Rohan Mehta', 
      role: 'Student Relations Head', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      shortDescription: 'Your go-to person for any accommodation-related queries.',
      fullBio: 'Rohan is a recent CU graduate who understands student needs intimately. He leads our student support team and ensures every query is resolved within 2 hours. His friendly approach has earned him the nickname "PG Guru" among students.',
      education: 'B.Com Honors, CU (2021)',
      experience: '3+ years in Customer Relations',
      location: 'Delhi, India',
      joinDate: 'August 2022',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/rohanmehta',
        twitter: 'https://twitter.com/rohanmehta',
        instagram: 'https://instagram.com/rohanmehta'
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
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeTeamMemberProfile = () => {
    setSelectedTeamMember(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const selectedMember = team.find(member => member.id === selectedTeamMember);

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
              We're more than just a platform - we're your trusted companion in finding safe, comfortable, 
              and affordable accommodation near CU campus. Where comfort meets convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('featured-pgs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Featured PGs
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
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-white via-white to-primary/5 rounded-3xl p-8 shadow-2xl shadow-primary/10 border border-primary/10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {stats.map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="group animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="mb-4">Our Journey</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  From Frustration to<span className="text-primary"> Solution</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    CU PG Finder was born in 2022 from a simple observation: finding reliable, 
                    affordable accommodation near campus shouldn't be a struggle for students.
                  </p>
                  <p>
                    What started as a small initiative to help fellow students has grown into a 
                    trusted platform helping thousands find their perfect home away from home.
                  </p>
                  <p className="font-semibold text-foreground">
                    Today, we're proud to be the most trusted PG finding platform for CU students.
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="primary" onClick={() => setShowVideo(true)}>
                    <Video className="h-4 w-4 mr-2" />
                    Our Story Video
                  </Button>
                  <Button variant="outline">Read Founder's Note</Button>
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
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
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
                </div>
              ))}
            </div>
          </div>
        </section>

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
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Student Voices</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Students Say About Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
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
                  <p className="italic text-muted-foreground mb-6 leading-relaxed">"{testimonial.feedback}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{member.name}</h3>
                  <div className="text-primary font-semibold mb-4">{member.role}</div>
                  <p className="text-muted-foreground text-sm mb-6">{member.shortDescription}</p>
                  <div className="flex justify-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = `mailto:${supportEmail}?subject=Contact ${member.name}`}
                    >
                      Contact
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
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
                    <h2 className="font-display text-2xl font-bold text-foreground">{selectedMember.name}</h2>
                    <p className="text-primary font-semibold">{selectedMember.role}</p>
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
                      <p className="text-muted-foreground mb-6 leading-relaxed">{selectedMember.fullBio}</p>
                      
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
                        variant="primary"
                        onClick={() => window.location.href = `mailto:${supportEmail}?subject=Contact ${selectedMember.name}`}
                        className="mb-6"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact {selectedMember.name.split(' ')[0]}
                      </Button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-8">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4">Key Achievements</h3>
                    <ul className="space-y-3">
                      {selectedMember.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Contact Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4">Get in Touch</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={`tel:${supportPhone}`}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <PhoneCall className="h-5 w-5 text-primary" />
                        <span className="font-medium">Call Support</span>
                      </a>
                      <a 
                        href={`mailto:${supportEmail}?subject=Regarding ${selectedMember.name}`}
                        className="flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors"
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

        {/* Newsletter */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12 text-center border border-primary/20">
              <MailIcon className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Stay Updated on New Listings
              </h2>
              <p className="text-muted-foreground mb-8">
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
                    className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <Button type="submit" variant="primary" className="px-8 py-4 text-lg">
                    Subscribe
                  </Button>
                </form>
              )}
              <p className="text-sm text-muted-foreground mt-6">
                No spam ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Ready to Find Your Perfect PG?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of students who found their ideal accommodation through CU PG Finder
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="px-10 py-6 text-lg font-semibold shadow-lg"
                onClick={() => document.getElementById('featured-pgs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse All PGs
              </Button>
              <a href={`tel:${supportPhone}`} className="inline-block">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-10 py-6 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white/10 w-full sm:w-auto"
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Call Support: {supportPhone}
                </Button>
              </a>
            </div>
            <div className="mt-8">
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