"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input, Textarea } from "@/components/ui";
import { Save, Home, Info, Plus, Trash2, Loader2 } from "lucide-react";

interface HeroContent {
  badge_text: string;
  headline: string;
  headline_highlight: string;
  subheadline: string;
  trust_points: string[];
}

interface AboutContent {
  company_story: string;
  years_experience: string;
  jobs_completed: string;
  happy_customers: string;
  average_rating: string;
  certifications: string[];
}

interface CTAContent {
  headline: string;
  headline_highlight: string;
  description: string;
  trust_note: string;
}

const defaultHero: HeroContent = {
  badge_text: "Trusted by 500+ homeowners in the Metro Area",
  headline: "Expert Electrical &",
  headline_highlight: "Handyman Services",
  subheadline: "From ceiling fans to smart home installations, we handle all your electrical needs with precision, reliability, and fair pricing. Licensed professionals, guaranteed satisfaction.",
  trust_points: ["Licensed & Insured", "Same-Day Service", "Satisfaction Guaranteed"],
};

const defaultAbout: AboutContent = {
  company_story: "With over a decade of experience in the electrical trade, our founder saw a gap in the market: homeowners needed reliable, fairly-priced help with everyday electrical tasks that didn't require a full contractor.",
  years_experience: "10+",
  jobs_completed: "1,200+",
  happy_customers: "500+",
  average_rating: "5.0",
  certifications: ["Licensed Electrical Contractor", "Fully Insured & Bonded", "EPA Certified", "OSHA Safety Trained", "Smart Home Certified", "Ring Pro Installer"],
};

const defaultCTA: CTAContent = {
  headline: "Ready to Get Your Project",
  headline_highlight: "Done Right?",
  description: "Get a free quote in minutes. Our friendly team is ready to help with any electrical or handyman project, big or small.",
  trust_note: "No obligation • Free estimates • Same-day response",
};

export default function ContentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "cta">("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [cta, setCTA] = useState<CTAContent>(defaultCTA);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("*");

    if (!error && data) {
      data.forEach((item: any) => {
        if (item.page_key === "hero") setHero({ ...defaultHero, ...item.content });
        if (item.page_key === "about") setAbout({ ...defaultAbout, ...item.content });
        if (item.page_key === "cta") setCTA({ ...defaultCTA, ...item.content });
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();

    try {
      const contents = [
        { page_key: "hero", content: hero },
        { page_key: "about", content: about },
        { page_key: "cta", content: cta },
      ];

      for (const item of contents) {
        const { error } = await supabase
          .from("page_content")
          .upsert(item, { onConflict: "page_key" });

        if (error) throw error;
      }

      setMessage({ type: "success", text: "Content saved successfully!" });
      router.refresh();
    } catch (err: any) {
      console.error("Error saving content:", err);
      setMessage({ type: "error", text: err.message || "Failed to save content" });
    }

    setIsSaving(false);
  };

  // Array management helpers
  const addTrustPoint = () => setHero({ ...hero, trust_points: [...hero.trust_points, ""] });
  const removeTrustPoint = (index: number) => setHero({ ...hero, trust_points: hero.trust_points.filter((_, i) => i !== index) });
  const updateTrustPoint = (index: number, value: string) => {
    const updated = [...hero.trust_points];
    updated[index] = value;
    setHero({ ...hero, trust_points: updated });
  };

  const addCertification = () => setAbout({ ...about, certifications: [...about.certifications, ""] });
  const removeCertification = (index: number) => setAbout({ ...about, certifications: about.certifications.filter((_, i) => i !== index) });
  const updateCertification = (index: number, value: string) => {
    const updated = [...about.certifications];
    updated[index] = value;
    setAbout({ ...about, certifications: updated });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-charcoal-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "hero" ? "bg-electric text-charcoal" : "text-charcoal-300 hover:text-white"
          }`}
        >
          <Home className="w-4 h-4" />
          Hero Section
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "about" ? "bg-electric text-charcoal" : "text-charcoal-300 hover:text-white"
          }`}
        >
          <Info className="w-4 h-4" />
          About Page
        </button>
        <button
          onClick={() => setActiveTab("cta")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "cta" ? "bg-electric text-charcoal" : "text-charcoal-300 hover:text-white"
          }`}
        >
          CTA Section
        </button>
      </div>

      {/* Hero Section Editor */}
      {activeTab === "hero" && (
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6">
              Homepage Hero Section
            </h3>

            <div className="space-y-5">
              <Input
                label="Badge Text"
                value={hero.badge_text}
                onChange={(e) => setHero({ ...hero, badge_text: e.target.value })}
                placeholder="Trusted by 500+ homeowners..."
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Headline (Part 1)"
                  value={hero.headline}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                  placeholder="Expert Electrical &"
                />
                <Input
                  label="Headline Highlight"
                  value={hero.headline_highlight}
                  onChange={(e) => setHero({ ...hero, headline_highlight: e.target.value })}
                  placeholder="Handyman Services"
                  helperText="This text will be highlighted"
                />
              </div>

              <Textarea
                label="Subheadline"
                value={hero.subheadline}
                onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                rows={3}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-charcoal-200">
                    Trust Points
                  </label>
                  <Button type="button" variant="secondary" size="sm" onClick={addTrustPoint}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {hero.trust_points.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={point}
                        onChange={(e) => updateTrustPoint(index, e.target.value)}
                        placeholder="e.g., Licensed & Insured"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTrustPoint(index)}
                        className="text-charcoal-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* About Section Editor */}
      {activeTab === "about" && (
        <div className="space-y-6">
          <Card>
            <CardContent>
              <h3 className="font-heading text-lg font-bold text-white mb-6">
                Company Story
              </h3>
              <Textarea
                label="Main Story Text"
                value={about.company_story}
                onChange={(e) => setAbout({ ...about, company_story: e.target.value })}
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-heading text-lg font-bold text-white mb-6">
                Statistics
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Input
                  label="Years Experience"
                  value={about.years_experience}
                  onChange={(e) => setAbout({ ...about, years_experience: e.target.value })}
                  placeholder="10+"
                />
                <Input
                  label="Jobs Completed"
                  value={about.jobs_completed}
                  onChange={(e) => setAbout({ ...about, jobs_completed: e.target.value })}
                  placeholder="1,200+"
                />
                <Input
                  label="Happy Customers"
                  value={about.happy_customers}
                  onChange={(e) => setAbout({ ...about, happy_customers: e.target.value })}
                  placeholder="500+"
                />
                <Input
                  label="Average Rating"
                  value={about.average_rating}
                  onChange={(e) => setAbout({ ...about, average_rating: e.target.value })}
                  placeholder="5.0"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg font-bold text-white">
                  Certifications
                </h3>
                <Button type="button" variant="secondary" size="sm" onClick={addCertification}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {about.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={cert}
                      onChange={(e) => updateCertification(index, e.target.value)}
                      placeholder="e.g., Licensed Electrical Contractor"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                      className="text-charcoal-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section Editor */}
      {activeTab === "cta" && (
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6">
              Call-to-Action Section
            </h3>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Headline (Part 1)"
                  value={cta.headline}
                  onChange={(e) => setCTA({ ...cta, headline: e.target.value })}
                  placeholder="Ready to Get Your Project"
                />
                <Input
                  label="Headline Highlight"
                  value={cta.headline_highlight}
                  onChange={(e) => setCTA({ ...cta, headline_highlight: e.target.value })}
                  placeholder="Done Right?"
                  helperText="This text will be highlighted"
                />
              </div>

              <Textarea
                label="Description"
                value={cta.description}
                onChange={(e) => setCTA({ ...cta, description: e.target.value })}
                rows={2}
              />

              <Input
                label="Trust Note"
                value={cta.trust_note}
                onChange={(e) => setCTA({ ...cta, trust_note: e.target.value })}
                placeholder="No obligation • Free estimates • Same-day response"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}

