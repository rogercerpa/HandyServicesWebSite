import { getSiteSettings, getFAQs } from "@/lib/data/settings-db";
import { getServicesFromDB } from "@/lib/data/services-db";
import ContactPageClient from "./ContactPageClient";

const defaultFaqs = [
  {
    question: "What areas do you serve?",
    answer: "We serve the Greater Metro Area including Downtown, Westside, Eastbrook, Northgate, Riverside, and surrounding communities within a 30-mile radius.",
  },
  {
    question: "Do you offer emergency services?",
    answer: "While we don't offer 24/7 emergency service, we do our best to accommodate urgent requests. Same-day appointments are often available for critical issues.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, cash, and checks. Payment is due upon completion of the work.",
  },
  {
    question: "Do you provide free estimates?",
    answer: "Yes! We provide free estimates for all our services. You can use our online quote tool or call us for a personalized estimate.",
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. We are fully licensed electrical contractors and carry comprehensive liability insurance for your protection.",
  },
  {
    question: "Do you guarantee your work?",
    answer: "Yes, all our work comes with a satisfaction guarantee. If something isn't right, we'll come back and fix it at no additional charge.",
  },
];

export default async function ContactPage() {
  const [settings, services, dbFaqs] = await Promise.all([
    getSiteSettings(),
    getServicesFromDB(),
    getFAQs(),
  ]);

  const faqs = dbFaqs || defaultFaqs;

  return (
    <ContactPageClient 
      services={services} 
      settings={settings} 
      faqs={faqs} 
    />
  );
}
