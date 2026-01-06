import { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { Card, CardContent, Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Fan, Lightbulb, Sun, ToggleRight, Sliders, Plug, Zap, Camera, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Fix it, papa! - Professional Handyman Services",
  description:
    "Explore our full range of electrical and handyman services including ceiling fan installation, light fixtures, switches, outlets, and smart home setup.",
};

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

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 geometric-dots opacity-30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Services
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
              Professional Electrical &{" "}
              <span className="text-gradient">Handyman Solutions</span>
            </h1>
            <p className="text-lg text-charcoal-300">
              From quick repairs to complete installations, we provide expert 
              service for all your home electrical needs. Click any service 
              below to learn more and schedule an appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Zap;
              return (
                <Card 
                  key={service.id} 
                  variant="interactive"
                  className="group"
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr,2fr,auto] gap-6 p-6 md:p-8 items-center">
                      {/* Icon & Price */}
                      <div className="flex md:flex-col items-center md:items-start gap-4">
                        <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                          <IconComponent className="w-8 h-8 text-electric" />
                        </div>
                        <div className="md:mt-2">
                          <span className="text-xs text-charcoal-400 block">Starting at</span>
                          <span className="text-2xl font-bold text-electric">
                            {formatCurrency(service.startingPrice)}
                          </span>
                          {service.priceNote && (
                            <span className="text-xs text-charcoal-500 block">
                              {service.priceNote}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-electric transition-colors">
                          {service.name}
                        </h2>
                        <p className="text-charcoal-400 mb-4">
                          {service.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 text-sm text-charcoal-300">
                            <Clock className="w-4 h-4 text-electric" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {service.features.slice(0, 3).map((feature, i) => (
                              <span 
                                key={i}
                                className="text-xs bg-charcoal-700 text-charcoal-300 px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex md:flex-col gap-3 md:gap-2">
                        <Link href={`/services/${service.slug}`} className="flex-1 md:flex-none">
                          <Button variant="secondary" size="sm" className="w-full whitespace-nowrap">
                            Learn More
                          </Button>
                        </Link>
                        <Link href={`/quote?service=${service.id}`} className="flex-1 md:flex-none">
                          <Button size="sm" className="w-full whitespace-nowrap" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            Get Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal-950 border-t border-charcoal-800">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-charcoal-300 mb-8">
              No problem! Contact us with a description of your project and 
              we&apos;ll help you figure out the best solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="secondary">
                  Contact Us
                </Button>
              </Link>
              <Link href="/quote">
                <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get a Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

