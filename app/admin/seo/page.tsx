"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input, Textarea } from "@/components/ui";
import { Save, Search, Globe, Loader2 } from "lucide-react";

interface SEOSettings {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

const defaultSettings: SEOSettings = {
  meta_title: "Fix it, papa! | Professional Handyman Services",
  meta_description: "Expert electrical and handyman services including ceiling fan installation, light fixtures, switches, power receptacles, and smart home setup. Licensed, reliable, and affordable.",
  meta_keywords: "handyman, electrician, ceiling fan installation, light fixture, electrical services, home repair",
};

export default function SEOPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SEOSettings>(defaultSettings);
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
      .eq("category", "seo");

    if (!error && data) {
      const loadedSettings: Partial<SEOSettings> = {};
      data.forEach((item: any) => {
        let value = item.value;
        if (typeof value === 'string') {
          loadedSettings[item.key as keyof SEOSettings] = value;
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
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key, value, category: "seo" },
            { onConflict: "key" }
          );

        if (error) throw error;
      }

      setMessage({ type: "success", text: "SEO settings saved successfully!" });
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
      <div>
        <h1 className="font-heading text-2xl font-bold text-white mb-2">SEO Settings</h1>
        <p className="text-charcoal-400">Configure how your website appears in search engine results.</p>
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

      {/* Meta Title */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-electric" />
            Meta Title
          </h3>

          <div className="space-y-4">
            <Input
              label="Page Title"
              value={settings.meta_title}
              onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
              placeholder="Your Business | Tagline"
              helperText={`${settings.meta_title.length}/60 characters recommended`}
            />
            
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-4">
              <p className="text-xs text-charcoal-500 mb-2">Search Result Preview:</p>
              <p className="text-blue-400 text-lg hover:underline cursor-pointer truncate">
                {settings.meta_title || "Page Title"}
              </p>
              <p className="text-green-500 text-sm">www.yourwebsite.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meta Description */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-electric" />
            Meta Description
          </h3>

          <div className="space-y-4">
            <Textarea
              label="Page Description"
              value={settings.meta_description}
              onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
              placeholder="A brief description of your website..."
              rows={3}
              helperText={`${settings.meta_description.length}/160 characters recommended`}
            />
            
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-4">
              <p className="text-xs text-charcoal-500 mb-2">Search Result Preview:</p>
              <p className="text-blue-400 text-lg hover:underline cursor-pointer truncate">
                {settings.meta_title || "Page Title"}
              </p>
              <p className="text-green-500 text-sm">www.yourwebsite.com</p>
              <p className="text-charcoal-300 text-sm mt-1 line-clamp-2">
                {settings.meta_description || "Page description will appear here..."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keywords */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">Keywords</h3>

          <div className="space-y-4">
            <Textarea
              label="Meta Keywords"
              value={settings.meta_keywords}
              onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
              placeholder="handyman, electrician, home repair, ceiling fan installation..."
              rows={2}
              helperText="Comma-separated keywords related to your business"
            />
            
            <div className="flex flex-wrap gap-2">
              {settings.meta_keywords.split(",").map((keyword, i) => (
                keyword.trim() && (
                  <span
                    key={i}
                    className="bg-charcoal-700 text-charcoal-200 text-xs px-3 py-1 rounded-full"
                  >
                    {keyword.trim()}
                  </span>
                )
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Tips */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-4">SEO Tips</h3>
          <ul className="text-charcoal-400 text-sm space-y-2">
            <li>• Keep your title under 60 characters for best display in search results</li>
            <li>• Meta description should be 150-160 characters for optimal display</li>
            <li>• Include your main keywords naturally in both title and description</li>
            <li>• Make your description compelling to encourage clicks</li>
            <li>• Include your location if you serve a specific area</li>
          </ul>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5 mr-2" />
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
}

