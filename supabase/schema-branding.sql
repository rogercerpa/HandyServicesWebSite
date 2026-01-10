-- =====================================================
-- Fix it, papa! - Extended Branding Schema
-- Run this SQL in your Supabase SQL Editor after schema.sql
-- =====================================================

-- =====================================================
-- LEGAL PAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS legal_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  last_updated DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for legal pages
ALTER TABLE legal_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read legal pages" ON legal_pages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage legal pages" ON legal_pages
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Apply updated_at trigger
CREATE TRIGGER update_legal_pages_updated_at BEFORE UPDATE ON legal_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INSERT DEFAULT BRANDING SETTINGS
-- =====================================================
INSERT INTO site_settings (key, value, category)
VALUES
('business_name', '"Fix it, papa!"', 'branding'),
('tagline', '"Handyman Services"', 'branding'),
('logo_url', '""', 'branding'),
('favicon_url', '""', 'branding')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- INSERT DEFAULT SEO SETTINGS
-- =====================================================
INSERT INTO site_settings (key, value, category)
VALUES
('meta_title', '"Fix it, papa! | Professional Handyman Services"', 'seo'),
('meta_description', '"Expert electrical and handyman services including ceiling fan installation, light fixtures, switches, power receptacles, and smart home setup. Licensed, reliable, and affordable."', 'seo'),
('meta_keywords', '"handyman, electrician, ceiling fan installation, light fixture, electrical services, home repair"', 'seo')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- INSERT DEFAULT THEME SETTINGS
-- =====================================================
INSERT INTO site_settings (key, value, category)
VALUES
('primary_color', '"#EEFF00"', 'theme'),
('accent_color', '"#FF6B35"', 'theme')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- INSERT DEFAULT LEGAL PAGES
-- =====================================================
INSERT INTO legal_pages (page_key, title, content)
VALUES
('privacy', 'Privacy Policy', '# Privacy Policy

**Last updated: January 2024**

## Introduction

Fix it, papa! ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.

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

If you have questions about this privacy policy, please contact us at our listed phone number or email address.'),
('terms', 'Terms of Service', '# Terms of Service

**Last updated: January 2024**

## Agreement to Terms

By accessing or using Fix it, papa! services, you agree to be bound by these Terms of Service.

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

Fix it, papa! shall not be liable for:
- Pre-existing conditions not disclosed before service
- Issues arising from customer-provided materials
- Consequential or indirect damages

## Cancellation Policy

- Appointments can be rescheduled with 24 hours notice
- Same-day cancellations may incur a service fee

## Changes to Terms

We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.

## Contact Us

For questions about these terms, please contact us at our listed phone number or email address.')
ON CONFLICT (page_key) DO NOTHING;

