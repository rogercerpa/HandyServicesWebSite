import { Metadata } from "next";
import { getLegalPage, getBrandingSettings } from "@/lib/data/settings-db";
import { Card, CardContent } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getBrandingSettings();
  return {
    title: `Terms of Service | ${branding.business_name}`,
    description: `Terms of service for ${branding.business_name}. Read our service agreement, warranty information, and policies.`,
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

const defaultContent = `# Terms of Service

**Last updated: January 2024**

## Agreement to Terms

By accessing or using our services, you agree to be bound by these Terms of Service.

## Services

We provide electrical and handyman services for residential properties. All services are subject to availability and scheduling.

## Pricing and Payment

- Prices quoted are estimates and may vary based on actual work required
- Payment is due upon completion of services unless otherwise agreed
- We accept major credit cards, cash, and checks

## Warranties and Guarantees

- All work comes with a satisfaction guarantee
- If you are not satisfied with our work, we will return to address the issue at no additional charge
- Warranty period is 90 days from completion of service

## Limitations of Liability

We shall not be liable for:
- Pre-existing conditions not disclosed before service
- Issues arising from customer-provided materials
- Consequential or indirect damages

## Cancellation Policy

- Appointments can be rescheduled with 24 hours notice
- Same-day cancellations may incur a service fee

## Changes to Terms

We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.

## Contact Us

For questions about these terms, please contact us at our listed phone number or email address.`;

export default async function TermsPage() {
  const legalPage = await getLegalPage("terms");
  const content = legalPage?.content || defaultContent;
  const title = legalPage?.title || "Terms of Service";
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

