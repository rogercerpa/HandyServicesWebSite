import {
  Hero,
  FeaturedServices,
  TrustIndicators,
  Testimonials,
  CTASection,
} from "@/components/home";
import { getServicesFromDB } from "@/lib/data/services-db";

export default async function HomePage() {
  const services = await getServicesFromDB();

  return (
    <>
      <Hero />
      <TrustIndicators />
      <FeaturedServices services={services} />
      <Testimonials />
      <CTASection />
    </>
  );
}

