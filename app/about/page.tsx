import { Metadata } from "next";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { 
  ArrowRight, 
  Shield, 
  Heart, 
  Target, 
  Wrench,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Award,
  ThumbsUp
} from "lucide-react";
import { getPageContent, getBrandingSettings } from "@/lib/data/settings-db";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Fix it, papa! - Professional Handyman Services",
  description:
    "Learn about Fix it, papa! - your trusted local handyman service. Discover our story, values, and commitment to quality workmanship.",
};

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Heart,
  Target,
  Clock,
  Wrench,
  Star,
  Zap,
  Award,
  CheckCircle,
  ThumbsUp,
};

export default async function AboutPage() {
  const [pageContent, branding] = await Promise.all([
    getPageContent(),
    getBrandingSettings(),
  ]);
  const about = pageContent.about;
  
  // Fallback values
  const values = about.values && about.values.length > 0 
    ? about.values 
    : [
        { icon: "Shield", title: "Reliability", description: "We show up on time, every time. When we commit to a job, you can count on us to see it through with professionalism." },
        { icon: "Heart", title: "Integrity", description: "Honest pricing, transparent communication, and doing the right thing even when no one is watching." },
        { icon: "Target", title: "Quality", description: "We take pride in our work. Every installation, repair, and upgrade is done to the highest standards." },
        { icon: "Clock", title: "Efficiency", description: "Your time is valuable. We work efficiently without cutting corners, completing jobs promptly and correctly." },
      ];

  const whyChooseUs = about.why_choose_us && about.why_choose_us.length > 0
    ? about.why_choose_us
    : [
        { title: "Transparent Pricing", description: "No hidden fees or surprise charges. We provide detailed quotes upfront." },
        { title: "Clean & Respectful", description: "We treat your home with care, wearing shoe covers and cleaning up after every job." },
        { title: "Guaranteed Work", description: "All our work is backed by a satisfaction guarantee. If it's not right, we'll fix it." },
        { title: "Fast Response", description: "Same-day and next-day appointments available. We know electrical issues can't wait." },
      ];

  const certifications = about.certifications && about.certifications.length > 0 
    ? about.certifications 
    : ["Licensed Electrical Contractor", "Fully Insured & Bonded", "EPA Certified", "OSHA Safety Trained", "Smart Home Certified", "Ring Pro Installer"];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 geometric-dots opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
                About Us
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
                {about.hero_headline || "Your Trusted Partner for"}{" "}
                <span className="text-gradient">{about.hero_headline_highlight || "Home Electrical Needs"}</span>
              </h1>
              <p className="text-lg text-charcoal-300 mb-6">
                {about.hero_description || "Fix it, papa! was founded with a simple mission: to provide homeowners with reliable, professional, and affordable electrical and handyman services. We believe every home deserves to have working, safe, and modern electrical systems."}
              </p>
              <p className="text-charcoal-400 mb-8">
                {about.hero_description_secondary || "What started as a one-person operation has grown into a trusted local service, but our core values remain the same. We treat every home like our own, every customer like family."}
              </p>
              <Link href="/contact">
                <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get in Touch
                </Button>
              </Link>
            </div>

            {/* Image/Visual */}
            <div className="relative">
              <div className="aspect-square bg-charcoal-800 rounded-3xl overflow-hidden border border-charcoal-700">
                {about.hero_image_url ? (
                  <>
                    <Image
                      src={about.hero_image_url}
                      alt={branding.business_name || "Fix it, papa!"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                      <p className="font-heading text-2xl font-bold text-white">{branding.business_name || "Fix it, papa!"}</p>
                      <p className="text-charcoal-300">Est. {about.established_year || "2015"}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Wrench className="w-24 h-24 text-electric mx-auto mb-4" />
                        <p className="font-heading text-2xl font-bold text-white">{branding.business_name || "Fix it, papa!"}</p>
                        <p className="text-charcoal-400">Est. {about.established_year || "2015"}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-electric/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-electric/30 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-charcoal-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Story
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-8">
              Built on Experience, Driven by Service
            </h2>
            <div className="text-charcoal-300 space-y-4 text-left">
              <p>
                {about.company_story || "With over a decade of experience in the electrical trade, our founder saw a gap in the market: homeowners needed reliable, fairly-priced help with everyday electrical tasks that didn't require a full contractor."}
              </p>
              <p>
                {about.story_paragraph_2 || "From replacing a ceiling fan to installing a complete smart home lighting system, we fill that need. We bring professional expertise to every job, whether it's a 30-minute outlet repair or an all-day installation project."}
              </p>
              <p>
                Today, Fix it, papa! has completed over {about.jobs_completed || "1,200+"} jobs for more than
                {" "}{about.happy_customers || "500+"} satisfied customers across the Metro area. We&apos;re proud of 
                our {about.average_rating || "5.0"}-star reputation and the trust our community has placed in us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Values
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              What We Stand For
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <Card key={value.title} className="text-center">
                  <CardContent>
                    <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-electric" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-charcoal-400 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-charcoal-900 border-y border-charcoal-800">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-white mb-2">
              Licensed, Certified & Professional
            </h2>
            <p className="text-charcoal-400">
              Your safety and satisfaction are our top priorities
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 bg-charcoal-800 border border-charcoal-700 rounded-full px-5 py-2"
              >
                <CheckCircle className="w-4 h-4 text-electric" />
                <span className="text-charcoal-200 text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <div>
              <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
                Why Choose Us
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-8">
                What Sets Us Apart
              </h2>
              
              <div className="space-y-6">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-charcoal-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold text-electric mb-2">
                    {about.years_experience || "10+"}
                  </div>
                  <p className="text-charcoal-300">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold text-electric mb-2">
                    {about.jobs_completed || "1,200+"}
                  </div>
                  <p className="text-charcoal-300">Jobs Completed</p>
                </div>
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold text-electric mb-2">
                    {about.happy_customers || "500+"}
                  </div>
                  <p className="text-charcoal-300">Happy Customers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="font-heading text-4xl font-bold text-electric">{about.average_rating || "5.0"}</span>
                    <Star className="w-6 h-6 text-electric fill-electric" />
                  </div>
                  <p className="text-charcoal-300">Average Rating</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-charcoal-700 text-center">
                <p className="text-charcoal-300 mb-4">
                  Ready to experience the difference?
                </p>
                <Link href="/quote">
                  <Button className="w-full sm:w-auto">
                    Get Your Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal-950">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              {about.cta_headline || "Let's Work Together"}
            </h2>
            <p className="text-charcoal-300 mb-8">
              {about.cta_description || "Whether you have a quick question or need to schedule a service, we're here to help."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button variant="secondary">
                  Explore Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
