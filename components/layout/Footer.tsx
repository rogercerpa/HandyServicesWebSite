import { getSiteSettings, getBrandingSettings } from "@/lib/data/settings-db";
import { getServicesFromDB } from "@/lib/data/services-db";
import { FooterContent } from "./FooterContent";

export async function Footer() {
  const [settings, branding, services] = await Promise.all([
    getSiteSettings(),
    getBrandingSettings(),
    getServicesFromDB(),
  ]);
  
  return (
    <FooterContent 
      settings={settings}
      branding={branding}
      services={services}
    />
  );
}
