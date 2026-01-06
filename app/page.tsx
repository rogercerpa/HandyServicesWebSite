import {
  Hero,
  FeaturedServices,
  TrustIndicators,
  Testimonials,
  CTASection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <FeaturedServices />
      <Testimonials />
      <CTASection />
    </>
  );
}

