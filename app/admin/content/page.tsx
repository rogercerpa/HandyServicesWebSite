"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input, Textarea } from "@/components/ui";
import { Save, Home, Info, Plus, Trash2, Loader2, ChevronDown, ChevronUp } from "lucide-react";

interface HeroContent {
  badge_text: string;
  headline: string;
  headline_highlight: string;
  subheadline: string;
  trust_points: string[];
}

interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsItem {
  title: string;
  description: string;
}

interface AboutContent {
  // Hero section
  hero_headline: string;
  hero_headline_highlight: string;
  hero_description: string;
  hero_description_secondary: string;
  // Hero visual
  hero_image_url: string;
  established_year: string;
  // Our Story section
  company_story: string;
  story_paragraph_2: string;
  // Stats
  years_experience: string;
  jobs_completed: string;
  happy_customers: string;
  average_rating: string;
  // Certifications
  certifications: string[];
  // Values
  values: AboutValue[];
  // Why Choose Us
  why_choose_us: WhyChooseUsItem[];
  // CTA
  cta_headline: string;
  cta_description: string;
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
  hero_headline: "Your Trusted Partner for",
  hero_headline_highlight: "Home Electrical Needs",
  hero_description: "Fix it, papa! was founded with a simple mission: to provide homeowners with reliable, professional, and affordable electrical and handyman services. We believe every home deserves to have working, safe, and modern electrical systems.",
  hero_description_secondary: "What started as a one-person operation has grown into a trusted local service, but our core values remain the same. We treat every home like our own, every customer like family.",
  hero_image_url: "",
  established_year: "2015",
  company_story: "With over a decade of experience in the electrical trade, our founder saw a gap in the market: homeowners needed reliable, fairly-priced help with everyday electrical tasks that didn't require a full contractor.",
  story_paragraph_2: "From replacing a ceiling fan to installing a complete smart home lighting system, we fill that need. We bring professional expertise to every job, whether it's a 30-minute outlet repair or an all-day installation project.",
  years_experience: "10+",
  jobs_completed: "1,200+",
  happy_customers: "500+",
  average_rating: "5.0",
  certifications: ["Licensed Electrical Contractor", "Fully Insured & Bonded", "EPA Certified", "OSHA Safety Trained", "Smart Home Certified", "Ring Pro Installer"],
  values: [
    { icon: "Shield", title: "Reliability", description: "We show up on time, every time. When we commit to a job, you can count on us to see it through with professionalism." },
    { icon: "Heart", title: "Integrity", description: "Honest pricing, transparent communication, and doing the right thing even when no one is watching." },
    { icon: "Target", title: "Quality", description: "We take pride in our work. Every installation, repair, and upgrade is done to the highest standards." },
    { icon: "Clock", title: "Efficiency", description: "Your time is valuable. We work efficiently without cutting corners, completing jobs promptly and correctly." },
  ],
  why_choose_us: [
    { title: "Transparent Pricing", description: "No hidden fees or surprise charges. We provide detailed quotes upfront." },
    { title: "Clean & Respectful", description: "We treat your home with care, wearing shoe covers and cleaning up after every job." },
    { title: "Guaranteed Work", description: "All our work is backed by a satisfaction guarantee. If it's not right, we'll fix it." },
    { title: "Fast Response", description: "Same-day and next-day appointments available. We know electrical issues can't wait." },
  ],
  cta_headline: "Let's Work Together",
  cta_description: "Whether you have a quick question or need to schedule a service, we're here to help.",
};

const defaultCTA: CTAContent = {
  headline: "Ready to Get Your Project",
  headline_highlight: "Done Right?",
  description: "Get a free quote in minutes. Our friendly team is ready to help with any electrical or handyman project, big or small.",
  trust_note: "No obligation • Free estimates • Same-day response",
};

const iconOptions = ["Shield", "Heart", "Target", "Clock", "Wrench", "Star", "Zap", "Award", "CheckCircle", "ThumbsUp"];

export default function ContentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "cta">("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Collapsible sections for About page
  const [expandedSections, setExpandedSections] = useState({
    heroSection: true,
    storySection: false,
    statsSection: false,
    certificationsSection: false,
    valuesSection: false,
    whyChooseSection: false,
    ctaSection: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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

  // Array management helpers for Hero
  const addTrustPoint = () => setHero({ ...hero, trust_points: [...hero.trust_points, ""] });
  const removeTrustPoint = (index: number) => setHero({ ...hero, trust_points: hero.trust_points.filter((_, i) => i !== index) });
  const updateTrustPoint = (index: number, value: string) => {
    const updated = [...hero.trust_points];
    updated[index] = value;
    setHero({ ...hero, trust_points: updated });
  };

  // Array management for Certifications
  const addCertification = () => setAbout({ ...about, certifications: [...about.certifications, ""] });
  const removeCertification = (index: number) => setAbout({ ...about, certifications: about.certifications.filter((_, i) => i !== index) });
  const updateCertification = (index: number, value: string) => {
    const updated = [...about.certifications];
    updated[index] = value;
    setAbout({ ...about, certifications: updated });
  };

  // Array management for Values
  const addValue = () => setAbout({ ...about, values: [...about.values, { icon: "Star", title: "", description: "" }] });
  const removeValue = (index: number) => setAbout({ ...about, values: about.values.filter((_, i) => i !== index) });
  const updateValue = (index: number, field: keyof AboutValue, value: string) => {
    const updated = [...about.values];
    updated[index] = { ...updated[index], [field]: value };
    setAbout({ ...about, values: updated });
  };

  // Array management for Why Choose Us
  const addWhyChoose = () => setAbout({ ...about, why_choose_us: [...about.why_choose_us, { title: "", description: "" }] });
  const removeWhyChoose = (index: number) => setAbout({ ...about, why_choose_us: about.why_choose_us.filter((_, i) => i !== index) });
  const updateWhyChoose = (index: number, field: keyof WhyChooseUsItem, value: string) => {
    const updated = [...about.why_choose_us];
    updated[index] = { ...updated[index], [field]: value };
    setAbout({ ...about, why_choose_us: updated });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  const SectionHeader = ({ 
    title, 
    sectionKey, 
    description 
  }: { 
    title: string; 
    sectionKey: keyof typeof expandedSections; 
    description?: string;
  }) => (
    <button
      type="button"
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-4 bg-charcoal-800 hover:bg-charcoal-750 rounded-xl transition-colors"
    >
      <div className="text-left">
        <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
        {description && <p className="text-sm text-charcoal-400 mt-1">{description}</p>}
      </div>
      {expandedSections[sectionKey] ? (
        <ChevronUp className="w-5 h-5 text-charcoal-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-charcoal-400" />
      )}
    </button>
  );

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
        <div className="space-y-4">
          {/* Hero Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Page Hero Section" 
              sectionKey="heroSection"
              description="The main headline and introduction at the top of the About page"
            />
            {expandedSections.heroSection && (
              <div className="p-6 border-t border-charcoal-800 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Headline (Part 1)"
                    value={about.hero_headline}
                    onChange={(e) => setAbout({ ...about, hero_headline: e.target.value })}
                    placeholder="Your Trusted Partner for"
                  />
                  <Input
                    label="Headline Highlight"
                    value={about.hero_headline_highlight}
                    onChange={(e) => setAbout({ ...about, hero_headline_highlight: e.target.value })}
                    placeholder="Home Electrical Needs"
                    helperText="This text will be highlighted"
                  />
                </div>
                <Textarea
                  label="Main Description"
                  value={about.hero_description}
                  onChange={(e) => setAbout({ ...about, hero_description: e.target.value })}
                  rows={3}
                  placeholder="Fix it, papa! was founded with a simple mission..."
                />
                <Textarea
                  label="Secondary Description"
                  value={about.hero_description_secondary}
                  onChange={(e) => setAbout({ ...about, hero_description_secondary: e.target.value })}
                  rows={2}
                  placeholder="What started as a one-person operation..."
                />

                <div className="pt-4 border-t border-charcoal-700">
                  <h4 className="text-sm font-medium text-charcoal-200 mb-4">Hero Visual</h4>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Hero Image URL"
                      value={about.hero_image_url}
                      onChange={(e) => setAbout({ ...about, hero_image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      helperText="Leave empty to show icon placeholder"
                    />
                    <Input
                      label="Established Year"
                      value={about.established_year}
                      onChange={(e) => setAbout({ ...about, established_year: e.target.value })}
                      placeholder="2015"
                      helperText="Displayed as 'Est. 2015'"
                    />
                  </div>
                  {about.hero_image_url && (
                    <div className="mt-4">
                      <p className="text-sm text-charcoal-400 mb-2">Preview:</p>
                      <div className="w-32 h-32 rounded-xl overflow-hidden border border-charcoal-700">
                        <img 
                          src={about.hero_image_url} 
                          alt="Hero preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Our Story Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Our Story Section" 
              sectionKey="storySection"
              description="The company history and background story"
            />
            {expandedSections.storySection && (
              <div className="p-6 border-t border-charcoal-800 space-y-5">
                <Textarea
                  label="Main Story Paragraph"
                  value={about.company_story}
                  onChange={(e) => setAbout({ ...about, company_story: e.target.value })}
                  rows={3}
                  placeholder="With over a decade of experience..."
                />
                <Textarea
                  label="Second Paragraph"
                  value={about.story_paragraph_2}
                  onChange={(e) => setAbout({ ...about, story_paragraph_2: e.target.value })}
                  rows={3}
                  placeholder="From replacing a ceiling fan..."
                />
              </div>
            )}
          </div>

          {/* Statistics Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Statistics" 
              sectionKey="statsSection"
              description="Key numbers displayed in the stats card"
            />
            {expandedSections.statsSection && (
              <div className="p-6 border-t border-charcoal-800">
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
              </div>
            )}
          </div>

          {/* Certifications Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Certifications" 
              sectionKey="certificationsSection"
              description="Professional certifications and credentials"
            />
            {expandedSections.certificationsSection && (
              <div className="p-6 border-t border-charcoal-800">
                <div className="flex justify-end mb-4">
                  <Button type="button" variant="secondary" size="sm" onClick={addCertification}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Certification
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
              </div>
            )}
          </div>

          {/* Values Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Our Values" 
              sectionKey="valuesSection"
              description="Company values displayed in cards"
            />
            {expandedSections.valuesSection && (
              <div className="p-6 border-t border-charcoal-800">
                <div className="flex justify-end mb-4">
                  <Button type="button" variant="secondary" size="sm" onClick={addValue}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Value
                  </Button>
                </div>
                <div className="space-y-4">
                  {about.values.map((value, index) => (
                    <div key={index} className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-sm font-medium text-charcoal-300">Value #{index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeValue(index)}
                          className="text-charcoal-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-200 mb-2">Icon</label>
                          <select
                            value={value.icon}
                            onChange={(e) => updateValue(index, "icon", e.target.value)}
                            className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-electric focus:border-transparent"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                        <Input
                          label="Title"
                          value={value.title}
                          onChange={(e) => updateValue(index, "title", e.target.value)}
                          placeholder="e.g., Reliability"
                        />
                      </div>
                      <Textarea
                        label="Description"
                        value={value.description}
                        onChange={(e) => updateValue(index, "description", e.target.value)}
                        rows={2}
                        placeholder="We show up on time, every time..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Why Choose Us" 
              sectionKey="whyChooseSection"
              description="Key selling points and differentiators"
            />
            {expandedSections.whyChooseSection && (
              <div className="p-6 border-t border-charcoal-800">
                <div className="flex justify-end mb-4">
                  <Button type="button" variant="secondary" size="sm" onClick={addWhyChoose}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-4">
                  {about.why_choose_us.map((item, index) => (
                    <div key={index} className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-sm font-medium text-charcoal-300">Item #{index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWhyChoose(index)}
                          className="text-charcoal-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <Input
                          label="Title"
                          value={item.title}
                          onChange={(e) => updateWhyChoose(index, "title", e.target.value)}
                          placeholder="e.g., Transparent Pricing"
                        />
                        <Textarea
                          label="Description"
                          value={item.description}
                          onChange={(e) => updateWhyChoose(index, "description", e.target.value)}
                          rows={2}
                          placeholder="No hidden fees or surprise charges..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl overflow-hidden">
            <SectionHeader 
              title="Call to Action Section" 
              sectionKey="ctaSection"
              description="The final section at the bottom of the About page"
            />
            {expandedSections.ctaSection && (
              <div className="p-6 border-t border-charcoal-800 space-y-5">
                <Input
                  label="Headline"
                  value={about.cta_headline}
                  onChange={(e) => setAbout({ ...about, cta_headline: e.target.value })}
                  placeholder="Let's Work Together"
                />
                <Textarea
                  label="Description"
                  value={about.cta_description}
                  onChange={(e) => setAbout({ ...about, cta_description: e.target.value })}
                  rows={2}
                  placeholder="Whether you have a quick question..."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section Editor */}
      {activeTab === "cta" && (
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6">
              Homepage Call-to-Action Section
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
