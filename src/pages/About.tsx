import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Users, MapPin, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { value: '500+', label: 'Verified PGs' },
    { value: '10K+', label: 'Happy Students' },
    { value: '50+', label: 'Locations' },
    { value: '4.8', label: 'Average Rating' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Every PG listing is personally verified by our team to ensure safety and quality standards.',
    },
    {
      icon: Users,
      title: 'Student First',
      description: 'Built by students, for students. We understand your needs and priorities.',
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep knowledge of CU campus and surrounding areas to help you find the perfect location.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'We only list PGs that meet our strict quality and amenity standards.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              About CU PG Finder
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Your trusted companion in finding the perfect paying guest accommodation near CU campus.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/50 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-2xl p-8 card-shadow">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CU PG Finder was born out of a simple frustration - finding reliable, affordable accommodation near campus shouldn't be this hard. As former CU students ourselves, we experienced firsthand the challenges of searching for a safe and comfortable place to stay.
                </p>
                <p>
                  We started this platform in 2022 with a mission to make the PG search process transparent, trustworthy, and stress-free. Today, we've helped over 10,000 students find their home away from home.
                </p>
                <p>
                  Every listing on our platform is personally verified by our team. We visit each property, check amenities, meet owners, and ensure that what you see is exactly what you get.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-6 card-shadow animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A dedicated team of CU alumni and students working to make your accommodation search easier.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Amit Kumar', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
                { name: 'Priya Sharma', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
                { name: 'Rahul Verma', role: 'Head of Verification', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
