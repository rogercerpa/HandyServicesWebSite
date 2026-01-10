"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { Save, Palette, Loader2, RotateCcw, Zap, CheckCircle, ArrowRight } from "lucide-react";

interface ThemeSettings {
  primary_color: string;
  accent_color: string;
}

const defaultSettings: ThemeSettings = {
  primary_color: "#EEFF00",
  accent_color: "#FF6B35",
};

const presetThemes = [
  { name: "Electric (Default)", primary: "#EEFF00", accent: "#FF6B35" },
  { name: "Ocean Blue", primary: "#00D4FF", accent: "#FF4081" },
  { name: "Forest Green", primary: "#00E676", accent: "#FF9100" },
  { name: "Royal Purple", primary: "#BB86FC", accent: "#03DAC6" },
  { name: "Sunset Orange", primary: "#FF6B35", accent: "#EEFF00" },
  { name: "Rose Gold", primary: "#FFB4A2", accent: "#E5989B" },
];

export default function ThemePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
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
      .eq("category", "theme");

    if (!error && data) {
      const loadedSettings: Partial<ThemeSettings> = {};
      data.forEach((item: any) => {
        let value = item.value;
        if (typeof value === 'string') {
          loadedSettings[item.key as keyof ThemeSettings] = value;
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
            { key, value, category: "theme" },
            { onConflict: "key" }
          );

        if (error) throw error;
      }

      setMessage({ type: "success", text: "Theme settings saved successfully! Refresh the page to see changes." });
      router.refresh();
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setMessage({ type: "error", text: err.message || "Failed to save settings" });
    }

    setIsSaving(false);
  };

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setSettings({
      primary_color: preset.primary,
      accent_color: preset.accent,
    });
  };

  const resetToDefault = () => {
    setSettings(defaultSettings);
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
        <h1 className="font-heading text-2xl font-bold text-white mb-2">Theme Settings</h1>
        <p className="text-charcoal-400">Customize your website&apos;s color scheme.</p>
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

      {/* Color Pickers */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-electric" />
            Brand Colors
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-charcoal-200 mb-3">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="w-16 h-16 rounded-xl cursor-pointer border-2 border-charcoal-600 overflow-hidden"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    placeholder="#EEFF00"
                  />
                  <p className="text-xs text-charcoal-500 mt-1">
                    Used for buttons, links, and highlights
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-sm font-medium text-charcoal-200 mb-3">
                Accent Color
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="color"
                    value={settings.accent_color}
                    onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                    className="w-16 h-16 rounded-xl cursor-pointer border-2 border-charcoal-600 overflow-hidden"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={settings.accent_color}
                    onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                    placeholder="#FF6B35"
                  />
                  <p className="text-xs text-charcoal-500 mt-1">
                    Used for secondary elements and accents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preset Themes */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-bold text-white">Preset Themes</h3>
            <Button variant="ghost" size="sm" onClick={resetToDefault}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {presetThemes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  settings.primary_color === preset.primary && settings.accent_color === preset.accent
                    ? "border-electric bg-charcoal-800"
                    : "border-charcoal-700 hover:border-charcoal-500"
                }`}
              >
                <div className="flex gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <p className="text-white font-medium text-sm">{preset.name}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">Live Preview</h3>
          
          <div className="bg-charcoal-950 border border-charcoal-700 rounded-xl p-6 space-y-6">
            {/* Header Preview */}
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: settings.primary_color }}
              >
                <Zap className="w-6 h-6 text-charcoal" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white">Fix it, papa!</span>
                <span className="block text-xs text-charcoal-400">Handyman Services</span>
              </div>
            </div>

            {/* Button Preview */}
            <div className="flex flex-wrap gap-4">
              <button
                className="px-6 py-3 rounded-xl font-semibold text-charcoal transition-colors flex items-center gap-2"
                style={{ backgroundColor: settings.primary_color }}
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="px-6 py-3 rounded-xl font-semibold border-2 text-charcoal-200"
                style={{ borderColor: settings.primary_color, color: settings.primary_color }}
              >
                Learn More
              </button>
            </div>

            {/* Trust Points Preview */}
            <div className="flex flex-wrap gap-4">
              {["Licensed & Insured", "Same-Day Service", "Satisfaction Guaranteed"].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{ color: settings.primary_color }} />
                  <span className="text-charcoal-200">{point}</span>
                </div>
              ))}
            </div>

            {/* Accent Preview */}
            <div className="flex items-center gap-4">
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: settings.accent_color }}
              />
              <span className="text-charcoal-400">Accent color used for notifications and highlights</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5 mr-2" />
          Save Theme
        </Button>
      </div>
    </div>
  );
}

