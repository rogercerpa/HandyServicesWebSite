"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card, CardContent, Textarea } from "@/components/ui";
import { Save, Plus, Trash2, ArrowLeft, GripVertical } from "lucide-react";
import Link from "next/link";

interface ServiceFormProps {
  service?: {
    id: string;
    slug: string;
    name: string;
    short_description: string | null;
    full_description: string | null;
    icon: string;
    image: string | null;
    starting_price: number;
    price_note: string | null;
    duration: string | null;
    features: string[];
    process: { step: number; title: string; description: string }[];
    faq: { question: string; answer: string }[];
    related_services: string[];
    is_active: boolean;
    sort_order: number;
  };
}

const iconOptions = [
  "Fan", "Lightbulb", "Sun", "ToggleRight", "Sliders", "Plug", "Zap", "Camera",
  "Wrench", "Home", "Shield", "Settings", "Power", "Wifi", "Thermometer"
];

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: service?.name || "",
    slug: service?.slug || "",
    short_description: service?.short_description || "",
    full_description: service?.full_description || "",
    icon: service?.icon || "Zap",
    image: service?.image || "",
    starting_price: service?.starting_price || 0,
    price_note: service?.price_note || "",
    duration: service?.duration || "",
    is_active: service?.is_active ?? true,
    sort_order: service?.sort_order || 0,
  });

  const [features, setFeatures] = useState<string[]>(
    service?.features || [""]
  );

  const [process, setProcess] = useState<{ step: number; title: string; description: string }[]>(
    service?.process || [{ step: 1, title: "", description: "" }]
  );

  const [faq, setFaq] = useState<{ question: string; answer: string }[]>(
    service?.faq || [{ question: "", answer: "" }]
  );

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: !service ? generateSlug(name) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();

    // Filter out empty items
    const cleanedFeatures = features.filter((f) => f.trim() !== "");
    const cleanedProcess = process.filter((p) => p.title.trim() !== "");
    const cleanedFaq = faq.filter((f) => f.question.trim() !== "");

    const serviceData = {
      ...formData,
      features: cleanedFeatures,
      process: cleanedProcess.map((p, i) => ({ ...p, step: i + 1 })),
      faq: cleanedFaq,
      starting_price: Number(formData.starting_price),
      sort_order: Number(formData.sort_order),
    };

    try {
      if (service) {
        // Update existing service
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", service.id);

        if (error) throw error;
      } else {
        // Create new service
        const { error } = await supabase
          .from("services")
          .insert([serviceData]);

        if (error) throw error;
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving service:", err);
      setError(err.message || "Failed to save service");
      setIsSubmitting(false);
    }
  };

  // Feature handlers
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  // Process handlers
  const addProcessStep = () => {
    setProcess([...process, { step: process.length + 1, title: "", description: "" }]);
  };
  const removeProcessStep = (index: number) => {
    setProcess(process.filter((_, i) => i !== index));
  };
  const updateProcessStep = (index: number, field: "title" | "description", value: string) => {
    const updated = [...process];
    updated[index] = { ...updated[index], [field]: value };
    setProcess(updated);
  };

  // FAQ handlers
  const addFaq = () => setFaq([...faq, { question: "", answer: "" }]);
  const removeFaq = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
  };
  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faq];
    updated[index] = { ...updated[index], [field]: value };
    setFaq(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back button */}
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 text-charcoal-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Basic Info */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">
            Basic Information
          </h3>

          <div className="grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Service Name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g., Ceiling Fan Replacement"
                required
              />
              <Input
                label="URL Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="ceiling-fan-replacement"
                required
              />
            </div>

            <Textarea
              label="Short Description"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Brief description for service cards"
              rows={2}
            />

            <Textarea
              label="Full Description"
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              placeholder="Detailed description for the service page"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Details */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">
            Pricing & Details
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Input
              label="Starting Price ($)"
              type="number"
              min="0"
              step="0.01"
              value={formData.starting_price}
              onChange={(e) => setFormData({ ...formData, starting_price: parseFloat(e.target.value) || 0 })}
            />
            <Input
              label="Price Note"
              value={formData.price_note}
              onChange={(e) => setFormData({ ...formData, price_note: e.target.value })}
              placeholder="e.g., Fan not included"
            />
            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 1-2 hours"
            />
            <Input
              label="Sort Order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-charcoal-200 mb-2">
                Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full bg-charcoal-800 border border-charcoal-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="mt-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 rounded border-charcoal-600 bg-charcoal-800 text-electric focus:ring-electric"
              />
              <span className="text-white">Active (visible on website)</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-bold text-white">
              Features
            </h3>
            <Button type="button" variant="secondary" size="sm" onClick={addFeature}>
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-charcoal-500 cursor-move" />
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="e.g., Safe removal of existing fan"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="text-charcoal-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Steps */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-bold text-white">
              Process Steps
            </h3>
            <Button type="button" variant="secondary" size="sm" onClick={addProcessStep}>
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          </div>

          <div className="space-y-4">
            {process.map((step, index) => (
              <div key={index} className="flex items-start gap-3 bg-charcoal-800/50 rounded-xl p-4">
                <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center text-charcoal font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-3">
                  <Input
                    value={step.title}
                    onChange={(e) => updateProcessStep(index, "title", e.target.value)}
                    placeholder="Step title"
                  />
                  <Input
                    value={step.description}
                    onChange={(e) => updateProcessStep(index, "description", e.target.value)}
                    placeholder="Step description"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProcessStep(index)}
                  className="text-charcoal-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-bold text-white">
              Frequently Asked Questions
            </h3>
            <Button type="button" variant="secondary" size="sm" onClick={addFaq}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="bg-charcoal-800/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      value={item.question}
                      onChange={(e) => updateFaq(index, "question", e.target.value)}
                      placeholder="Question"
                    />
                    <Textarea
                      value={item.answer}
                      onChange={(e) => updateFaq(index, "answer", e.target.value)}
                      placeholder="Answer"
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFaq(index)}
                    className="text-charcoal-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/services">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          <Save className="w-5 h-5 mr-2" />
          {service ? "Save Changes" : "Create Service"}
        </Button>
      </div>
    </form>
  );
}

