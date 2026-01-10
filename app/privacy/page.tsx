import { Metadata } from "next";
import { getLegalPage, getBrandingSettings } from "@/lib/data/settings-db";
import { Card, CardContent } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getBrandingSettings();
  return {
    title: `Privacy Policy | ${branding.business_name}`,
    description: `Privacy policy for ${branding.business_name}. Learn how we collect, use, and protect your personal information.`,
  };
}

// Simple markdown renderer
function renderMarkdown(content: string): string {
  let html = content
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 text-charcoal-300">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-charcoal-300 mb-4">')
    .replace(/\n/g, '<br>');

  return `<div class="prose prose-invert max-w-none"><p class="text-charcoal-300 mb-4">${html}</p></div>`;
}

const defaultContent = `# Privacy Policy

**Last updated: January 2024**

## Introduction

We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.

## Information We Collect

### Personal Information
- Name and contact details (email, phone number, address)
- Service requests and preferences
- Communication history with our team

### Automatically Collected Information
- Browser type and version
- Pages visited and time spent
- Device information

## How We Use Your Information

We use your information to:
- Provide and improve our services
- Respond to your inquiries and service requests
- Send appointment confirmations and updates
- Process payments

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.

## Your Rights

You have the right to:
- Access your personal data
- Request correction of inaccurate data
- Request deletion of your data
- Opt-out of marketing communications

## Contact Us

If you have questions about this privacy policy, please contact us at our listed phone number or email address.`;

export default async function PrivacyPage() {
  const legalPage = await getLegalPage("privacy");
  const content = legalPage?.content || defaultContent;
  const title = legalPage?.title || "Privacy Policy";
  const lastUpdated = legalPage?.last_updated;

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent>
                <h1 className="font-heading text-3xl font-bold text-white mb-2">
                  {title}
                </h1>
                {lastUpdated && (
                  <p className="text-charcoal-400 text-sm mb-8">
                    Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
                <div 
                  className="text-charcoal-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

