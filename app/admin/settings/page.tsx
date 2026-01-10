"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { Save, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Loader2 } from "lucide-react";

interface SiteSettings {
  phone: string;
  email: string;
  service_area: string;
  service_radius: string;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
}

const defaultSettings: SiteSettings = {
  phone: "(123) 456-7890",
  email: "hello@fixitpapa.com",
  service_area: "Greater Metro Area",
  service_radius: "30 miles",
  hours_weekday: "8:00 AM - 6:00 PM",
  hours_saturday: "9:00 AM - 4:00 PM",
  hours_sunday: "Closed",
  facebook_url: "",
  instagram_url: "",
  twitter_url: "",
};

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("category", "contact");

    if (!error && data) {
      const loadedSettings: Partial<SiteSettings> = {};
      data.forEach((item: any) => {
        // JSONB values come back as parsed JS values
        // If it's a string, use it directly; if it's wrapped in quotes, extract it
        let value = item.value;
        if (typeof value === 'string') {
          loadedSettings[item.key as keyof SiteSettings] = value;
        } else if (typeof value === 'object' && value !== null) {
          // If it's an object, stringify it (shouldn't happen for settings)
          loadedSettings[item.key as keyof SiteSettings] = JSON.stringify(value);
        }
      });
      setSettings({ ...defaultSettings, ...loadedSettings });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();
    
    try {
      // Upsert each setting
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key, value, category: "contact" },
            { onConflict: "key" }
          );

        if (error) throw error;
      }

      setMessage({ type: "success", text: "Settings saved successfully!" });
      router.refresh();
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setMessage({ type: "error", text: err.message || "Failed to save settings" });
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Contact Information */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-electric" />
            Contact Information
          </h3>

          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Phone Number"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="(123) 456-7890"
                leftIcon={<Phone className="w-5 h-5" />}
              />
              <Input
                label="Email Address"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="hello@fixitpapa.com"
                leftIcon={<Mail className="w-5 h-5" />}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Service Area"
                value={settings.service_area}
                onChange={(e) => setSettings({ ...settings, service_area: e.target.value })}
                placeholder="Greater Metro Area"
                leftIcon={<MapPin className="w-5 h-5" />}
              />
              <Input
                label="Service Radius"
                value={settings.service_radius}
                onChange={(e) => setSettings({ ...settings, service_radius: e.target.value })}
                placeholder="30 miles"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-electric" />
            Business Hours
          </h3>

          <div className="space-y-5">
            <Input
              label="Monday - Friday"
              value={settings.hours_weekday}
              onChange={(e) => setSettings({ ...settings, hours_weekday: e.target.value })}
              placeholder="8:00 AM - 6:00 PM"
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Saturday"
                value={settings.hours_saturday}
                onChange={(e) => setSettings({ ...settings, hours_saturday: e.target.value })}
                placeholder="9:00 AM - 4:00 PM"
              />
              <Input
                label="Sunday"
                value={settings.hours_sunday}
                onChange={(e) => setSettings({ ...settings, hours_sunday: e.target.value })}
                placeholder="Closed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">
            Social Media Links
          </h3>

          <div className="space-y-5">
            <Input
              label="Facebook URL"
              value={settings.facebook_url}
              onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
              placeholder="https://facebook.com/fixitpapa"
              leftIcon={<Facebook className="w-5 h-5" />}
            />
            <Input
              label="Instagram URL"
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              placeholder="https://instagram.com/fixitpapa"
              leftIcon={<Instagram className="w-5 h-5" />}
            />
            <Input
              label="Twitter/X URL"
              value={settings.twitter_url}
              onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
              placeholder="https://twitter.com/fixitpapa"
              leftIcon={<Twitter className="w-5 h-5" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}

