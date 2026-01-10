import { getSiteSettings, getBrandingSettings } from "@/lib/data/settings-db";
import { HeaderContent } from "./HeaderContent";

export async function Header() {
  const [settings, branding] = await Promise.all([
    getSiteSettings(),
    getBrandingSettings(),
  ]);
  
  return (
    <HeaderContent 
      phone={settings.phone}
      businessName={branding.business_name}
      tagline={branding.tagline}
      logoUrl={branding.logo_url}
    />
  );
}
