import { Shield, MapPin, CreditCard, Clock, Star, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Every PG is personally verified for safety, cleanliness, and amenities.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Find accommodations within walking distance of CU campus.',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    description: 'No hidden charges. What you see is what you pay.',
  },
  {
    icon: Clock,
    title: 'Quick Booking',
    description: 'Book your preferred PG in minutes with our simple process.',
  },
  {
    icon: Star,
    title: 'Genuine Reviews',
    description: 'Read authentic reviews from fellow students.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our team is always available to help you find the perfect stay.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Why CU PG Finder?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Your Trusted Accommodation Partner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We understand the stress of finding the right place to stay. That's why we've made it our mission to simplify your search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
