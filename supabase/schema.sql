-- =====================================================
-- Fix it, papa! - Database Schema for Admin Panel
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ADMINS TABLE - Whitelist of admin users
-- =====================================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for admins table
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all admins" ON admins
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  icon TEXT DEFAULT 'Zap',
  image TEXT,
  starting_price DECIMAL(10,2) DEFAULT 0,
  price_note TEXT,
  duration TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  faq JSONB DEFAULT '[]'::jsonb,
  related_services TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage services" ON services
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  service TEXT,
  date DATE DEFAULT CURRENT_DATE,
  image TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active testimonials" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- QUOTE QUESTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS quote_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('select', 'number', 'radio', 'checkbox')),
  options JSONB DEFAULT '[]'::jsonb,
  min_value INTEGER,
  max_value INTEGER,
  price_per_unit DECIMAL(10,2),
  sort_order INTEGER DEFAULT 0,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for quote questions
ALTER TABLE quote_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read quote questions" ON quote_questions
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage quote questions" ON quote_questions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- SITE SETTINGS TABLE (Key-Value Store)
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for site settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- PAGE CONTENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for page content
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read page content" ON page_content
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage page content" ON page_content
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- FAQS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for FAQs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active FAQs" ON faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage FAQs" ON faqs
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- QUOTE SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS quote_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_name TEXT,
  answers JSONB DEFAULT '{}'::jsonb,
  estimated_price DECIMAL(10,2),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  contact_address TEXT,
  preferred_date DATE,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for quote submissions
ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert quote submissions" ON quote_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage quote submissions" ON quote_submissions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for contact submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage contact submissions" ON contact_submissions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- ANALYTICS EVENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  page_path TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  session_id TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON analytics_events(page_path);

-- RLS for analytics
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read analytics" ON analytics_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_questions_updated_at BEFORE UPDATE ON quote_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON page_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_submissions_updated_at BEFORE UPDATE ON quote_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INSERT INITIAL ADMIN (Update with your email!)
-- =====================================================
-- IMPORTANT: Replace 'your-admin-email@example.com' with your actual email
-- INSERT INTO admins (email, name) VALUES ('your-admin-email@example.com', 'Admin');

-- =====================================================
-- STORAGE BUCKET FOR IMAGES
-- =====================================================
-- Run this in Supabase Dashboard > Storage > Create new bucket
-- Bucket name: images
-- Public bucket: true (for public access to service images)

