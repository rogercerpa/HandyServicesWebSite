import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import { getPageContent } from "@/lib/data/settings-db";

export async function Hero() {
  const pageContent = await getPageContent();
  
  const hero = pageContent.hero;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 geometric-grid opacity-50" />
      
      {/* Glowing orb effects */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-charcoal-800/80 backdrop-blur-sm border border-charcoal-700 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-electric fill-electric" />
            <span className="text-sm text-charcoal-200">
              {hero.badge_text}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            {hero.headline}{" "}
            <span className="text-gradient">{hero.headline_highlight}</span>{" "}
            You Can Trust
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-charcoal-300 max-w-2xl mb-10 animate-fade-in-up animation-delay-100">
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-200">
            <Link href="/quote">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {/* Trust Points */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-300">
            {hero.trust_points.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-electric" />
                <span className="text-charcoal-200 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
    </section>
  );
}
