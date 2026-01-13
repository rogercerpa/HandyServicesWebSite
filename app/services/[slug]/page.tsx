import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServicesFromDB, getServiceBySlugFromDB, getRelatedServicesFromDB } from "@/lib/data/services-db";
import { getTestimonialsByService } from "@/lib/data/testimonials";
import { Card, CardContent, Button, Badge } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  CheckCircle, 
  Star, 
  ChevronDown,
  Phone,
  Fan, 
  Lightbulb, 
  Sun, 
  ToggleRight, 
  Sliders, 
  Plug, 
  Zap, 
  Camera 
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Fan,
  Lightbulb,
  Sun,
  ToggleRight,
  Sliders,
  Plug,
  Zap,
  Camera,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServicesFromDB();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugFromDB(slug);
  
  if (!service) {
    return {
      title: "Service Not Found | Fix it, papa!",
    };
  }

  return {
    title: `${service.name} | Fix it, papa! - Professional Handyman Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlugFromDB(slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Zap;
  const relatedServices = await getRelatedServicesFromDB(service.relatedServices);
  const reviews = getTestimonialsByService(service.name);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 geometric-dots opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          {/* Back Link */}
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-charcoal-400 hover:text-electric mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-electric" />
                </div>
                <Badge variant="success">Professional Service</Badge>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {service.name}
              </h1>
              
              <p className="text-lg text-charcoal-300 mb-8">
                {service.fullDescription}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-4">
                  <span className="text-xs text-charcoal-400 block mb-1">Starting at</span>
                  <span className="text-2xl font-bold text-electric">
                    {formatCurrency(service.startingPrice)}
                  </span>
                  {service.priceNote && (
                    <span className="text-xs text-charcoal-500 block mt-1">
                      {service.priceNote}
                    </span>
                  )}
                </div>
                <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-4">
                  <span className="text-xs text-charcoal-400 block mb-1">Duration</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-electric" />
                    <span className="text-lg font-semibold text-white">{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/quote?service=${service.id}`}>
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Get a Quote
                  </Button>
                </Link>
                <Link href="tel:+1234567890">
                  <Button variant="secondary" size="lg" leftIcon={<Phone className="w-5 h-5" />}>
                    Call Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-charcoal-800 rounded-2xl overflow-hidden border border-charcoal-700">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-electric/20 rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-charcoal-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                What&apos;s Included
              </h2>
              <div className="space-y-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                Our Process
              </h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-electric rounded-lg flex items-center justify-center font-bold text-charcoal">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-charcoal-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <details 
                  key={i} 
                  className="group bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-white pr-4">{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-charcoal-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-charcoal-300">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="section-padding bg-charcoal-950">
          <div className="container-custom">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8">
              Customer Reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-electric fill-electric" />
                      ))}
                    </div>
                    <p className="text-charcoal-200 mb-4">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-charcoal-700">
                      <div className="w-10 h-10 bg-electric/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-electric text-sm">
                          {review.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{review.name}</p>
                        <p className="text-xs text-charcoal-400">{review.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8">
              Related Services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related) => {
                const RelatedIcon = iconMap[related.icon] || Zap;
                return (
                  <Link key={related.id} href={`/services/${related.slug}`}>
                    <Card variant="interactive" className="h-full">
                      <CardContent>
                        <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mb-4">
                          <RelatedIcon className="w-6 h-6 text-electric" />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-white mb-2">
                          {related.name}
                        </h3>
                        <p className="text-charcoal-400 text-sm mb-4">
                          {related.shortDescription}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-charcoal-700">
                          <span className="text-electric font-bold">
                            {formatCurrency(related.startingPrice)}
                          </span>
                          <ArrowRight className="w-5 h-5 text-charcoal-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-charcoal-950 border-t border-charcoal-800">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-charcoal-300 mb-8">
              Get a free quote for your {service.name.toLowerCase()} project today.
              We&apos;ll respond within 24 hours.
            </p>
            <Link href={`/quote?service=${service.id}`}>
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

