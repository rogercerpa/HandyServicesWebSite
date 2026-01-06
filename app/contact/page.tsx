"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input, Textarea, Select } from "@/components/ui";
import { services } from "@/lib/data/services";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  ChevronDown,
  MessageSquare
} from "lucide-react";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We serve the Greater Metro Area including Downtown, Westside, Eastbrook, Northgate, Riverside, and surrounding communities within a 30-mile radius.",
  },
  {
    question: "Do you offer emergency services?",
    answer: "While we don't offer 24/7 emergency service, we do our best to accommodate urgent requests. Same-day appointments are often available for critical issues.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, cash, and checks. Payment is due upon completion of the work.",
  },
  {
    question: "Do you provide free estimates?",
    answer: "Yes! We provide free estimates for all our services. You can use our online quote tool or call us for a personalized estimate.",
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. We are fully licensed electrical contractors and carry comprehensive liability insurance for your protection.",
  },
  {
    question: "Do you guarantee your work?",
    answer: "Yes, all our work comes with a satisfaction guarantee. If something isn't right, we'll come back and fix it at no additional charge.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const serviceOptions = [
    { value: "", label: "Select a service (optional)" },
    ...services.map((s) => ({ value: s.id, label: s.name })),
    { value: "other", label: "Other / Not sure" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 geometric-dots opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
              Contact Us
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
              Let&apos;s Talk About Your{" "}
              <span className="text-gradient">Project</span>
            </h1>
            <p className="text-lg text-charcoal-300">
              Have a question or ready to schedule a service? We&apos;re here to help.
              Reach out and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact Cards */}
              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                    <a 
                      href="tel:+1234567890" 
                      className="text-charcoal-300 hover:text-electric transition-colors"
                    >
                      (123) 456-7890
                    </a>
                    <p className="text-sm text-charcoal-500 mt-1">
                      Call for immediate assistance
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <a 
                      href="mailto:hello@fixitpapa.com" 
                      className="text-charcoal-300 hover:text-electric transition-colors"
                    >
                      hello@fixitpapa.com
                    </a>
                    <p className="text-sm text-charcoal-500 mt-1">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Service Area</h3>
                    <p className="text-charcoal-300">Greater Metro Area</p>
                    <p className="text-sm text-charcoal-500 mt-1">
                      30-mile radius coverage
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                    <div className="text-charcoal-300 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-charcoal-500">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:sticky lg:top-24">
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-charcoal-300 mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare className="w-6 h-6 text-electric" />
                      <h2 className="font-heading text-xl font-bold text-white">
                        Send Us a Message
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Your Name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="(123) 456-7890"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <Select
                          label="Service Interested In"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          options={serviceOptions}
                        />
                      </div>

                      <Textarea
                        label="Your Message"
                        name="message"
                        placeholder="Tell us about your project or ask us a question..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        isLoading={isSubmitting}
                        rightIcon={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      <p className="text-xs text-charcoal-500 text-center">
                        By submitting this form, you agree to be contacted regarding your inquiry.
                      </p>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl overflow-hidden h-[300px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-charcoal-600 mx-auto mb-4" />
              <p className="text-charcoal-400">Service Area Map</p>
              <p className="text-sm text-charcoal-500">
                Map integration coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-charcoal-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
                FAQ
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details 
                  key={i} 
                  className="group bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-white pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-charcoal-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-charcoal-300">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

