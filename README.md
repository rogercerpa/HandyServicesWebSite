# Fix it, papa! - Handyman Services Website

A modern, bold Next.js website for "Fix it, papa!" handyman business, featuring electrical and home improvement services.

## Features

- **Home Page**: Hero section, featured services, trust indicators, testimonials carousel
- **Services Page**: All 8 services with pricing, descriptions, and quick access to quotes
- **Service Detail Pages**: Full service information, process steps, FAQs, and customer reviews
- **About Us Page**: Company story, values, certifications, and team information
- **Contact Page**: Contact form, business info, FAQ section
- **Get a Quote**: Multi-step wizard with real-time price calculation
- **Customer Portal** (Mock): Dashboard, service history, payments, and profile management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Fonts**: Instrument Sans (headings) + DM Sans (body)

## Design

- **Theme**: Bold & Modern with dark mode base
- **Primary Colors**: Deep charcoal (#1a1a1a) + Electric yellow (#FFD60A)
- **Style Elements**: Strong geometric shapes, high contrast, subtle animations

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /page.tsx              # Home page
  /about/page.tsx        # About us
  /services/page.tsx     # Services listing
  /services/[slug]/      # Individual service detail
  /contact/page.tsx      # Contact us
  /quote/page.tsx        # Get a quote wizard
  /portal/
    /layout.tsx          # Portal layout (sidebar nav)
    /page.tsx            # Dashboard
    /login/page.tsx      # Login UI
    /history/page.tsx    # Service history
    /payments/page.tsx   # Payments
    /profile/page.tsx    # Profile settings
/components
  /ui/                   # Reusable UI components
  /layout/               # Header, Footer
  /home/                 # Home page sections
/lib
  /data/                 # Mock data (services, testimonials, etc.)
  /utils.ts              # Helper functions
```

## Services Included

1. Ceiling Fan Replacement
2. Light Fixture Replacement
3. Light Fixture Installation
4. Light Switches Replacement/Upgrades
5. Lighting Controls Installation
6. Power Receptacle Repair
7. Power Receptacle Replacement
8. Ring Camera Installation

## Future Integrations

This project is structured for easy integration with:

- **Supabase**: Authentication and database
- **Stripe**: Payment processing
- **Vercel**: Deployment

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

Private project for Fix it, papa! Handyman Services.

