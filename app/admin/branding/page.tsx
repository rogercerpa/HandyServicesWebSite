"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input } from "@/components/ui";
import Image from "next/image";
import { Save, Building2, Image as ImageIcon, Loader2, Zap, Upload, X } from "lucide-react";

interface BrandingSettings {
  business_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
}

const defaultSettings: BrandingSettings = {
  business_name: "Fix it, papa!",
  tagline: "Handyman Services",
  logo_url: "",
  favicon_url: "",
};

export default function BrandingPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<BrandingSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<"logo" | "favicon" | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("category", "branding");

    if (!error && data) {
      const loadedSettings: Partial<BrandingSettings> = {};
      data.forEach((item: any) => {
        let value = item.value;
        if (typeof value === 'string') {
          loadedSettings[item.key as keyof BrandingSettings] = value;
        }
      });
      setSettings({ ...defaultSettings, ...loadedSettings });
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (file: File, type: "logo" | "favicon") => {
    if (!file) return;

    setIsUploading(type);
    const supabase = createClient();

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `branding/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      // Update settings
      if (type === "logo") {
        setSettings({ ...settings, logo_url: publicUrl });
      } else {
        setSettings({ ...settings, favicon_url: publicUrl });
      }

      setMessage({ type: "success", text: `${type === "logo" ? "Logo" : "Favicon"} uploaded successfully!` });
    } catch (err: any) {
      console.error("Upload error:", err);
      setMessage({ type: "error", text: err.message || "Failed to upload image" });
    }

    setIsUploading(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();

    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key, value, category: "branding" },
            { onConflict: "key" }
          );

        if (error) throw error;
      }

      setMessage({ type: "success", text: "Branding settings saved successfully!" });
      router.refresh();
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setMessage({ type: "error", text: err.message || "Failed to save settings" });
    }

    setIsSaving(false);
  };

  const clearImage = (type: "logo" | "favicon") => {
    if (type === "logo") {
      setSettings({ ...settings, logo_url: "" });
    } else {
      setSettings({ ...settings, favicon_url: "" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white mb-2">Branding Settings</h1>
        <p className="text-charcoal-400">Customize your business name, logo, and identity.</p>
      </div>

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

      {/* Business Name & Tagline */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-electric" />
            Business Information
          </h3>

          <div className="space-y-5">
            <Input
              label="Business Name"
              value={settings.business_name}
              onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
              placeholder="Fix it, papa!"
              helperText="This appears in the header and footer"
            />
            <Input
              label="Tagline"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              placeholder="Handyman Services"
              helperText="Short description shown below the business name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Logo Upload */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-electric" />
            Logo
          </h3>

          <div className="space-y-4">
            {settings.logo_url ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 bg-charcoal-700 rounded-xl overflow-hidden border border-charcoal-600">
                  <Image
                    src={settings.logo_url}
                    alt="Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="text-charcoal-300 text-sm mb-2">Current logo</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => clearImage("logo")}
                    className="text-red-400"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-charcoal-600 rounded-xl p-8 text-center">
                <Zap className="w-12 h-12 text-charcoal-500 mx-auto mb-4" />
                <p className="text-charcoal-400 mb-4">No logo uploaded. Using default icon.</p>
              </div>
            )}

            <div>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "logo");
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  isLoading={isUploading === "logo"}
                  onClick={(e) => {
                    const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input');
                    input?.click();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading === "logo" ? "Uploading..." : "Upload Logo"}
                </Button>
              </label>
              <p className="text-xs text-charcoal-500 mt-2">
                Recommended size: 200x200px. PNG or SVG with transparent background works best.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favicon Upload */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-electric" />
            Favicon
          </h3>

          <div className="space-y-4">
            {settings.favicon_url ? (
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-charcoal-700 rounded-lg overflow-hidden border border-charcoal-600">
                  <Image
                    src={settings.favicon_url}
                    alt="Favicon"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="text-charcoal-300 text-sm mb-2">Current favicon</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => clearImage("favicon")}
                    className="text-red-400"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-charcoal-600 rounded-xl p-6 text-center">
                <ImageIcon className="w-8 h-8 text-charcoal-500 mx-auto mb-2" />
                <p className="text-charcoal-400 text-sm">No favicon uploaded. Using default.</p>
              </div>
            )}

            <div>
              <label className="block">
                <input
                  type="file"
                  accept="image/*,.ico"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "favicon");
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  isLoading={isUploading === "favicon"}
                  onClick={(e) => {
                    const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input');
                    input?.click();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading === "favicon" ? "Uploading..." : "Upload Favicon"}
                </Button>
              </label>
              <p className="text-xs text-charcoal-500 mt-2">
                Recommended size: 32x32px or 64x64px. PNG, ICO, or SVG format.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">Preview</h3>
          
          <div className="bg-charcoal-950 border border-charcoal-700 rounded-xl p-4">
            <div className="flex items-center gap-2">
              {settings.logo_url ? (
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image src={settings.logo_url} alt="Logo" fill className="object-contain" unoptimized />
                </div>
              ) : (
                <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-charcoal" />
                </div>
              )}
              <div>
                <span className="font-heading text-xl font-bold text-white">
                  {settings.business_name || "Business Name"}
                </span>
                <span className="block text-xs text-charcoal-400 -mt-1">
                  {settings.tagline || "Tagline"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5 mr-2" />
          Save Branding
        </Button>
      </div>
    </div>
  );
}

