import Link from "next/link";
import { services } from "@/lib/data/services";
import { Card, CardContent, Button } from "@/components/ui";
import { ArrowRight, Fan, Lightbulb, Sun, ToggleRight, Sliders, Plug, Zap, Camera } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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

export function FeaturedServices() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-dots opacity-30" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
            Our Services
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Professional Solutions for Your Home
          </h2>
          <p className="text-charcoal-300 text-lg">
            From simple repairs to complete installations, we provide expert 
            electrical and handyman services to keep your home running smoothly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Zap;
            return (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card 
                  variant="interactive" 
                  className="h-full flex flex-col"
                >
                  <CardContent className="flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                      <IconComponent className="w-7 h-7 text-electric" />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-electric transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-charcoal-400 text-sm flex-1 mb-4">
                      {service.shortDescription}
                    </p>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal-700">
                      <div>
                        <span className="text-xs text-charcoal-400">Starting at</span>
                        <p className="text-electric font-bold">
                          {formatCurrency(service.startingPrice)}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-charcoal-500 group-hover:text-electric group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="secondary" rightIcon={<ArrowRight className="w-5 h-5" />}>
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

