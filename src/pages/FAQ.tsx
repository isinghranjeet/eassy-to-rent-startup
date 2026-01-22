import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'How does CU PG Finder verify listings?',
      answer: 'Our team personally visits each property to verify the amenities, safety measures, and overall condition. We also verify the property owner\'s documents and conduct background checks to ensure your safety.',
    },
    {
      question: 'Is there any fee to use CU PG Finder?',
      answer: 'No, CU PG Finder is completely free for students. We don\'t charge any brokerage or service fees. Our revenue comes from property owners who list their PGs on our platform.',
    },
    {
      question: 'How can I book a PG through your platform?',
      answer: 'Simply browse our listings, find a PG you like, and click "Contact Owner" to connect directly with the property owner. You can then schedule a visit and finalize the booking directly with them.',
    },
    {
      question: 'What if I face issues after moving in?',
      answer: 'We have a dedicated support team to help you resolve any issues. You can contact us through our helpline or email, and we\'ll mediate with the property owner to resolve your concerns.',
    },
    {
      question: 'Can I compare different PGs?',
      answer: 'Yes! You can add up to 3 PGs to your compare list by clicking the compare icon on any listing. This lets you see a side-by-side comparison of prices, amenities, and features.',
    },
    {
      question: 'How do I save PGs for later?',
      answer: 'Click the heart icon on any PG listing to add it to your wishlist. You can access your saved PGs anytime from the wishlist page.',
    },
    {
      question: 'Are the reviews on your platform genuine?',
      answer: 'Yes, all reviews are from verified students who have actually stayed at the PG. We have strict moderation to prevent fake reviews and ensure authenticity.',
    },
    {
      question: 'How often is the availability updated?',
      answer: 'Property owners update their availability in real-time. However, we recommend contacting the owner to confirm current availability before planning your visit.',
    },
    {
      question: 'Can I list my PG on your platform?',
      answer: 'Yes! If you\'re a property owner, you can contact us to list your PG. Our team will visit your property for verification before it goes live on the platform.',
    },
    {
      question: 'What areas do you cover?',
      answer: 'We currently cover all areas within 2km of the CU campus, including popular locations like Gate 1 area, Library Road, Sports Complex, and Admin Block vicinity.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Find answers to common questions about using CU PG Finder.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-2xl px-6 card-shadow border-none"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <a href="/contact">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
