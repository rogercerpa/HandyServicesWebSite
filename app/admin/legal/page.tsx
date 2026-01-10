"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, Button, Input, Textarea } from "@/components/ui";
import { Save, FileText, Scale, Loader2, Eye } from "lucide-react";

interface LegalPage {
  page_key: string;
  title: string;
  content: string;
}

const defaultPages: LegalPage[] = [
  {
    page_key: "privacy",
    title: "Privacy Policy",
    content: "# Privacy Policy\n\nYour privacy policy content here...",
  },
  {
    page_key: "terms",
    title: "Terms of Service",
    content: "# Terms of Service\n\nYour terms of service content here...",
  },
];

export default function LegalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
  const [pages, setPages] = useState<LegalPage[]>(defaultPages);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("legal_pages")
      .select("*")
      .order("page_key");

    if (!error && data && data.length > 0) {
      setPages(data.map((p: any) => ({
        page_key: p.page_key,
        title: p.title,
        content: p.content,
      })));
    }
    setIsLoading(false);
  };

  const getCurrentPage = () => pages.find(p => p.page_key === activeTab) || defaultPages[0];

  const updatePage = (key: keyof LegalPage, value: string) => {
    setPages(pages.map(p => 
      p.page_key === activeTab ? { ...p, [key]: value } : p
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();
    const currentPage = getCurrentPage();

    try {
      const { error } = await supabase
        .from("legal_pages")
        .upsert(
          {
            page_key: currentPage.page_key,
            title: currentPage.title,
            content: currentPage.content,
            last_updated: new Date().toISOString().split('T')[0],
          },
          { onConflict: "page_key" }
        );

      if (error) throw error;

      setMessage({ type: "success", text: `${currentPage.title} saved successfully!` });
      router.refresh();
    } catch (err: any) {
      console.error("Error saving page:", err);
      setMessage({ type: "error", text: err.message || "Failed to save page" });
    }

    setIsSaving(false);
  };

  // Simple markdown to HTML converter for preview
  const renderMarkdown = (content: string) => {
    let html = content
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-charcoal-300 mb-4">')
      .replace(/\n/g, '<br>');
    
    return `<div class="prose prose-invert max-w-none"><p class="text-charcoal-300 mb-4">${html}</p></div>`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    );
  }

  const currentPage = getCurrentPage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white mb-2">Legal Pages</h1>
        <p className="text-charcoal-400">Edit your Privacy Policy and Terms of Service pages.</p>
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

      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-charcoal-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "privacy" ? "bg-electric text-charcoal" : "text-charcoal-300 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "terms" ? "bg-electric text-charcoal" : "text-charcoal-300 hover:text-white"
            }`}
          >
            <Scale className="w-4 h-4" />
            Terms of Service
          </button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye className="w-4 h-4 mr-2" />
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {/* Editor / Preview */}
      {showPreview ? (
        <Card>
          <CardContent>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              {currentPage.title}
            </h2>
            <div 
              className="text-charcoal-300"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(currentPage.content) }}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="space-y-5">
              <Input
                label="Page Title"
                value={currentPage.title}
                onChange={(e) => updatePage("title", e.target.value)}
                placeholder="Privacy Policy"
              />

              <div>
                <label className="block text-sm font-medium text-charcoal-200 mb-2">
                  Page Content
                </label>
                <Textarea
                  value={currentPage.content}
                  onChange={(e) => updatePage("content", e.target.value)}
                  rows={20}
                  placeholder="Enter your content using Markdown formatting..."
                  className="font-mono text-sm"
                />
                <p className="text-xs text-charcoal-500 mt-2">
                  Supports basic Markdown: # Heading, ## Subheading, **bold**, *italic*, - list items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-4">Legal Page Tips</h3>
          <ul className="text-charcoal-400 text-sm space-y-2">
            <li>• Include a &quot;Last Updated&quot; date at the top of each page</li>
            <li>• Privacy Policy should explain what data you collect and how it&apos;s used</li>
            <li>• Terms of Service should cover pricing, guarantees, and liability</li>
            <li>• Consider having a lawyer review your legal pages</li>
            <li>• Update these pages whenever your practices change</li>
          </ul>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5 mr-2" />
          Save {currentPage.title}
        </Button>
      </div>
    </div>
  );
}

