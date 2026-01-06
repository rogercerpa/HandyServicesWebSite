export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria Rodriguez",
    location: "Downtown",
    rating: 5,
    text: "Absolutely fantastic service! They replaced all my outdated light switches with smart dimmers. The work was clean, professional, and completed faster than expected. My home feels so much more modern now.",
    service: "Light Switches Replacement",
    date: "2025-12-15",
  },
  {
    id: "2",
    name: "James Thompson",
    location: "Westside",
    rating: 5,
    text: "Had three ceiling fans installed in one day. The team was punctual, courteous, and incredibly skilled. They even helped me understand how to use the remote controls. Highly recommend!",
    service: "Ceiling Fan Replacement",
    date: "2025-12-08",
  },
  {
    id: "3",
    name: "Sarah Chen",
    location: "Northgate",
    rating: 5,
    text: "I was worried about installing my Ring doorbell and cameras, but Fix it, papa! made it so easy. They positioned everything perfectly and walked me through the app setup. I feel so much safer now.",
    service: "Ring Camera Installation",
    date: "2025-11-28",
  },
  {
    id: "4",
    name: "Michael Brooks",
    location: "Eastbrook",
    rating: 5,
    text: "Professional, affordable, and reliable. They fixed two dead outlets and replaced my kitchen GFCI in under an hour. Great communication throughout. Will definitely use again!",
    service: "Power Receptacle Repair",
    date: "2025-11-20",
  },
  {
    id: "5",
    name: "Lisa Patel",
    location: "Riverside",
    rating: 5,
    text: "The chandelier installation in my dining room was perfect. They took extra care to ensure it was level and secure. The cleanup was impeccable - you'd never know they were there!",
    service: "Light Fixture Installation",
    date: "2025-11-12",
  },
  {
    id: "6",
    name: "David Kim",
    location: "Oak Hills",
    rating: 5,
    text: "Set up my whole-home Lutron lighting system. They programmed scenes for morning, evening, and movie night. The attention to detail was impressive. Worth every penny!",
    service: "Lighting Controls Installation",
    date: "2025-11-05",
  },
  {
    id: "7",
    name: "Jennifer Martinez",
    location: "Lakewood",
    rating: 5,
    text: "Quick response for an urgent outlet issue. They diagnosed and fixed the problem within 30 minutes. Fair pricing and excellent work ethic. My go-to handyman from now on!",
    service: "Power Receptacle Repair",
    date: "2025-10-28",
  },
  {
    id: "8",
    name: "Robert Wilson",
    location: "Greendale",
    rating: 5,
    text: "Replaced all the old light fixtures in my home office. The new pendant lights look amazing and the work was completed exactly as promised. True professionals!",
    service: "Light Fixture Replacement",
    date: "2025-10-15",
  },
];

export function getTestimonialsByService(serviceName: string): Testimonial[] {
  return testimonials.filter((t) => t.service.toLowerCase().includes(serviceName.toLowerCase()));
}

export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  return testimonials.slice(0, count);
}

