import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { getSiteSettings, getPageContent } from "@/lib/data/settings-db";

export async function CTASection() {
  const [settings, pageContent] = await Promise.all([
    getSiteSettings(),
    getPageContent(),
  ]);
  
  const cta = pageContent.cta;
  const phoneClean = settings.phone.replace(/[^0-9+]/g, '');

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="relative bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-3xl p-8 md:p-12 lg:p-16 border border-charcoal-700 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 geometric-grid opacity-20" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-electric rounded-2xl mb-8 animate-pulse-glow">
              <Calendar className="w-10 h-10 text-charcoal" />
            </div>

            {/* Content */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {cta.headline}{" "}
              <span className="text-gradient">{cta.headline_highlight}</span>
            </h2>
            <p className="text-lg text-charcoal-300 mb-10 max-w-2xl mx-auto">
              {cta.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Your Free Quote
                </Button>
              </Link>
              <Link href={`tel:${phoneClean}`}>
                <Button variant="secondary" size="lg" leftIcon={<Phone className="w-5 h-5" />}>
                  Call Now
                </Button>
              </Link>
            </div>

            {/* Trust note */}
            <p className="mt-8 text-sm text-charcoal-400">
              {cta.trust_note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
