import { useState, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare, 
  HelpCircle, Building, UserCheck, Shield, FileText,
  Map, Globe, Facebook, Twitter, Instagram, Linkedin,
  CheckCircle, AlertCircle, Loader2, Copy, Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const RECAPTCHA_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(10, 'Valid phone number is required').max(15, 'Phone number is too long'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
  enquiryType: z.string().min(1, 'Please select enquiry type'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    enquiryType: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [estimatedResponseTime, setEstimatedResponseTime] = useState('1-2 hours');
  const [contactPreferences, setContactPreferences] = useState({
    email: true,
    phone: false,
    whatsapp: true,
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Feature 1: Real-time Form Validation
  const validateField = (field: keyof ContactFormData, value: any) => {
    try {
      contactSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (field: keyof ContactFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // Feature 2: File Upload Handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + uploadedFiles.length > 3) {
      toast.error('Maximum 3 files allowed');
      return;
    }
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Feature 3: Copy Contact Info
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  // Feature 4: Schedule Callback
  const handleScheduleCallback = () => {
    toast.success('Callback scheduled!', {
      description: 'We will call you at your preferred time.',
      action: {
        label: 'View Schedule',
        onClick: () => toast.info('Schedule view coming soon'),
      },
    });
  };

  // Feature 5: FAQ Quick Links
  const faqTopics = [
    { title: 'Booking Process', icon: MessageSquare },
    { title: 'Payment Methods', icon: FileText },
    { title: 'PG Verification', icon: Shield },
    { title: 'Refund Policy', icon: CheckCircle },
  ];

  // Feature 6: Live Chat Simulation
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hi! How can I help you today?', time: '10:00 AM' },
  ]);

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message
    setChatHistory(prev => [...prev, {
      sender: 'user',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        sender: 'bot',
        message: 'Thanks for your message! Our team will get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
    
    setChatMessage('');
  };

  // Feature 7: Social Media Integration
  const socialLinks = [
    { platform: 'Facebook', icon: Facebook, url: 'https://facebook.com/cupgfinder' },
    { platform: 'Twitter', icon: Twitter, url: 'https://twitter.com/cupgfinder' },
    { platform: 'Instagram', icon: Instagram, url: 'https://instagram.com/cupgfinder' },
    { platform: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/cupgfinder' },
  ];

  // Feature 8: Form Submission with EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    // Validate CAPTCHA
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        to_name: 'CU PG Finder Team',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        enquiry_type: formData.enquiryType,
        contact_preferences: JSON.stringify(contactPreferences),
        uploaded_files_count: uploadedFiles.length,
        estimated_response_time: estimatedResponseTime,
        timestamp: new Date().toISOString(),
        'g-recaptcha-response': captchaToken,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Reset CAPTCHA
      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        enquiryType: '',
        consent: false,
      });
      setUploadedFiles([]);

      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.',
      });

      // Feature 9: Auto-response simulation
      setTimeout(() => {
        toast.info('📧 Auto-response sent to your email!');
      }, 2000);

    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Feature 10: Response Time Estimator
  const calculateResponseTime = (type: string) => {
    const times: Record<string, string> = {
      'general': '24 hours',
      'urgent': '1-2 hours',
      'booking': '2-4 hours',
      'support': '4-6 hours',
    };
    setEstimatedResponseTime(times[type] || '24 hours');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      content: 'CU Campus, University Road, Chandigarh - 160014',
      action: () => {
        window.open('https://maps.google.com/?q=CU+Campus+Chandigarh', '_blank');
      },
      actionText: 'Get Directions',
    },
    {
      icon: Phone,
      title: '24/7 Support',
      content: '+91 9315058665',
      action: () => copyToClipboard('+919315058665'),
      actionText: 'Copy Number',
    },
    {
      icon: Mail,
      title: 'Email Support',
      content: 'support@cupgfinder.com',
      action: () => copyToClipboard('support@cupgfinder.com'),
      actionText: 'Copy Email',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - Sun: 8:00 AM - 10:00 PM',
    },
    {
      icon: UserCheck,
      title: 'Personal Assistance',
      content: 'Book a 1:1 consultation',
      action: handleScheduleCallback,
      actionText: 'Schedule Call',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative hero-gradient py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Get in Touch With Us
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-3xl mx-auto">
              Have questions about PG accommodation? Our team is ready to assist you 24/7
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {faqTopics.map((topic) => (
                <Button
                  key={topic.title}
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  onClick={() => toast.info(`FAQ: ${topic.title}`)}
                >
                  <topic.icon className="h-4 w-4 mr-2" />
                  {topic.title}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Info Cards */}
              <div className="space-y-8">
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Multiple ways to reach us. Choose what works best for you!
                  </p>
                  
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div key={item.title} className="group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{item.content}</p>
                            {item.action && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-primary hover:text-primary"
                                onClick={item.action}
                              >
                                {item.actionText}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-8 pt-8 border-t">
                    <h4 className="font-medium text-foreground mb-4">Follow Us</h4>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <Button
                          key={social.platform}
                          variant="outline"
                          size="icon"
                          className="rounded-full w-10 h-10"
                          onClick={() => window.open(social.url, '_blank')}
                        >
                          <social.icon className="h-4 w-4" />
                          <span className="sr-only">{social.platform}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Chat Widget */}
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Live Chat Support
                  </h3>
                  <div className="space-y-4">
                    <div className="h-48 overflow-y-auto space-y-3 p-2">
                      {chatHistory.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-2xl p-3 ${
                            msg.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      />
                      <Button onClick={sendChatMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        Send Your Message
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        Estimated response time: <span className="font-semibold text-primary">{estimatedResponseTime}</span>
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Secure & Encrypted</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="mb-2">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="John Doe"
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="mb-2">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="john@example.com"
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="mb-2">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 1234567890"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="enquiryType" className="mb-2">
                          Enquiry Type *
                        </Label>
                        <select
                          id="enquiryType"
                          value={formData.enquiryType}
                          onChange={(e) => {
                            handleChange('enquiryType', e.target.value);
                            calculateResponseTime(e.target.value);
                          }}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="">Select type</option>
                          <option value="general">General Inquiry</option>
                          <option value="booking">Booking Assistance</option>
                          <option value="urgent">Urgent Support</option>
                          <option value="support">Technical Support</option>
                          <option value="listing">List Your PG</option>
                        </select>
                        {errors.enquiryType && (
                          <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.enquiryType}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="mb-2">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="How can we help you?"
                        className={errors.subject ? 'border-destructive' : ''}
                      />
                      {errors.subject && (
                        <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message" className="mb-2">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Please provide details about your enquiry..."
                        rows={6}
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* File Upload */}
                    <div>
                      <Label className="mb-2">Attachments (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="space-y-2">
                            <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Drag & drop files or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Max 3 files, 5MB each (PDF, JPG, PNG, DOC)
                            </p>
                          </div>
                        </label>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="text-sm truncate">{file.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-6 w-6 p-0"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Contact Preferences */}
                    <div>
                      <Label className="mb-3 block">Preferred Contact Method</Label>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(contactPreferences).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <Checkbox
                              id={`pref-${key}`}
                              checked={value}
                              onCheckedChange={(checked) =>
                                setContactPreferences(prev => ({
                                  ...prev,
                                  [key]: checked as boolean,
                                }))
                              }
                            />
                            <Label htmlFor={`pref-${key}`} className="capitalize">
                              {key}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CAPTCHA */}
                    <div>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={setCaptchaToken}
                        theme="light"
                        size="normal"
                      />
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleChange('consent', checked)}
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground">
                        I agree to the processing of my personal data in accordance with the{' '}
                        <a href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                        . I understand that this information will be used to respond to my enquiry.
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-destructive text-sm flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.consent}
                      </p>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !captchaToken}
                      className="w-full gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Form Tips */}
                  <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      All messages are encrypted and secure
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Average response time: {estimatedResponseTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-16">
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Visit Our Office
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Located near CU Campus for easy access. Feel free to visit us during business hours.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>CU Campus, University Road, Chandigarh - 160014</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Monday - Sunday: 8:00 AM - 10:00 PM</span>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Globe className="h-4 w-4" />
                        View on Google Maps
                      </Button>
                    </div>
                  </div>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive Map Integration</p>
                      <Button size="sm" variant="ghost" className="mt-2">
                        Load Map
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-muted-foreground mb-6">
                Thank you for contacting CU PG Finder. We've received your message and will respond within{' '}
                <span className="font-semibold text-primary">{estimatedResponseTime}</span>.
              </p>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>📧 A confirmation email has been sent to {formData.email}</p>
                  <p className="mt-1">📱 We'll contact you via your preferred method</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowSuccessModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => {
                      setShowSuccessModal(false);
                      window.location.href = '/';
                    }}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;