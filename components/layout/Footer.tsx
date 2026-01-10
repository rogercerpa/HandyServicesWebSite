import { getSiteSettings, getBrandingSettings } from "@/lib/data/settings-db";
import { FooterContent } from "./FooterContent";

export async function Footer() {
  const [settings, branding] = await Promise.all([
    getSiteSettings(),
    getBrandingSettings(),
  ]);
  
  return (
    <FooterContent 
      settings={settings}
      branding={branding}
    />
  );
}
