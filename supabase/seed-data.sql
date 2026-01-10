-- =====================================================
-- Fix it, papa! - Seed Data Migration
-- Run this AFTER schema.sql to populate initial data
-- =====================================================

-- =====================================================
-- INSERT ADMIN (Update with your email!)
-- =====================================================
INSERT INTO admins (email, name) 
VALUES ('your-admin-email@example.com', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- INSERT SERVICES
-- =====================================================
INSERT INTO services (slug, name, short_description, full_description, icon, image, starting_price, price_note, duration, features, process, faq, related_services, is_active, sort_order)
VALUES
(
  'ceiling-fan-replacement',
  'Ceiling Fan Replacement',
  'Professional removal and installation of ceiling fans with proper electrical connections.',
  'Upgrade your comfort with our professional ceiling fan replacement service. We safely remove your old fan and install your new one with precision, ensuring proper balance, secure mounting, and correct electrical connections. Whether you''re upgrading to a more efficient model or changing your room''s style, we''ve got you covered.',
  'Fan',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
  125,
  'Fan not included',
  '1-2 hours',
  '["Safe removal of existing fan", "Secure mounting bracket installation", "Proper electrical wiring", "Fan balancing and testing", "Remote/wall control setup", "Cleanup of work area"]'::jsonb,
  '[{"step": 1, "title": "Assessment", "description": "We inspect the existing wiring and ceiling structure"}, {"step": 2, "title": "Removal", "description": "Carefully disconnect and remove the old ceiling fan"}, {"step": 3, "title": "Installation", "description": "Mount the new fan bracket and assemble the fan"}, {"step": 4, "title": "Testing", "description": "Balance the blades and test all speed/light settings"}]'::jsonb,
  '[{"question": "Can you install a fan where there''s currently a light?", "answer": "Yes! If there''s existing electrical wiring, we can typically install a fan. We''ll assess if the electrical box needs upgrading to support the fan''s weight."}, {"question": "Do I need to provide the ceiling fan?", "answer": "Yes, please have the fan ready for installation. We''re happy to recommend brands and models if you need suggestions."}]'::jsonb,
  ARRAY['light-fixture-replacement', 'light-switches-replacement'],
  true,
  1
),
(
  'light-fixture-replacement',
  'Light Fixture Replacement',
  'Swap out dated fixtures for modern lighting that transforms your space.',
  'Transform the look and feel of any room with a new light fixture. Our expert installation ensures your new chandelier, pendant, flush mount, or any other fixture is safely and securely installed. We handle all the electrical work so you can enjoy your beautiful new lighting worry-free.',
  'Lightbulb',
  'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
  95,
  'Fixture not included',
  '45 min - 1.5 hours',
  '["Removal of existing fixture", "Secure mounting installation", "Proper wire connections", "Bulb installation & testing", "Smart dimmer compatibility check", "Cleanup included"]'::jsonb,
  '[{"step": 1, "title": "Power Off", "description": "Safely turn off power at the breaker"}, {"step": 2, "title": "Remove Old Fixture", "description": "Disconnect and remove the existing light"}, {"step": 3, "title": "Install New Fixture", "description": "Mount and wire your new light fixture"}, {"step": 4, "title": "Test & Finish", "description": "Restore power and test all functions"}]'::jsonb,
  '[{"question": "Can you install heavy chandeliers?", "answer": "Absolutely. For heavier fixtures, we ensure the electrical box is rated for the weight and may install additional support if needed."}, {"question": "What if my wiring is old?", "answer": "We''ll assess the wiring condition and let you know if any updates are needed for safety before proceeding."}]'::jsonb,
  ARRAY['light-fixture-installation', 'light-switches-replacement'],
  true,
  2
),
(
  'light-fixture-installation',
  'Light Fixture Installation',
  'New light fixture installation in locations without existing fixtures.',
  'Want to add lighting to a new location? Our installation service covers everything from running new wiring to mounting your fixture. We''ll work with your home''s existing electrical system to bring light exactly where you need it, whether it''s a new pendant over your kitchen island or recessed lighting in your living room.',
  'Sun',
  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
  175,
  'May vary based on wiring requirements',
  '2-4 hours',
  '["Site assessment and planning", "New electrical box installation", "Wiring from existing circuit", "Fixture mounting and connection", "Switch installation if needed", "Full testing and cleanup"]'::jsonb,
  '[{"step": 1, "title": "Consultation", "description": "Determine best location and wiring route"}, {"step": 2, "title": "Rough-in Work", "description": "Install electrical box and run new wiring"}, {"step": 3, "title": "Fixture Install", "description": "Mount and connect your new light fixture"}, {"step": 4, "title": "Final Testing", "description": "Test all connections and switch operation"}]'::jsonb,
  '[{"question": "Do I need a permit for new light installation?", "answer": "Simple fixture additions typically don''t require permits, but we''ll advise if your specific situation needs one."}, {"question": "Can you install recessed lighting?", "answer": "Yes! We install all types of lighting including recessed, pendant, track, and more."}]'::jsonb,
  ARRAY['light-fixture-replacement', 'lighting-controls-installation'],
  true,
  3
),
(
  'light-switches-replacement',
  'Light Switches Replacement/Upgrades',
  'Upgrade to modern switches including dimmers, smart switches, and stylish designs.',
  'Modernize your home with updated light switches. Whether you want sleek dimmer switches, convenient smart switches, or simply want to replace worn-out toggles, we provide safe and professional installation. Smart switch integration can add convenience and energy savings to your daily life.',
  'ToggleRight',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  65,
  'Per switch, switch not included',
  '20-45 minutes per switch',
  '["Old switch removal", "Smart switch compatibility check", "Proper wiring connections", "Dimmer calibration", "Smart home app setup", "Multi-switch configurations"]'::jsonb,
  '[{"step": 1, "title": "Power Off", "description": "Safely disconnect power at breaker"}, {"step": 2, "title": "Remove Old Switch", "description": "Disconnect and remove existing switch"}, {"step": 3, "title": "Install & Wire", "description": "Connect new switch with proper wiring"}, {"step": 4, "title": "Configure & Test", "description": "Set up smart features and test operation"}]'::jsonb,
  '[{"question": "Do smart switches need special wiring?", "answer": "Many smart switches require a neutral wire. We''ll check your wiring and recommend compatible switches for your home."}, {"question": "Can you install 3-way smart switches?", "answer": "Yes, we handle 3-way and 4-way switch configurations for multi-location control."}]'::jsonb,
  ARRAY['lighting-controls-installation', 'light-fixture-replacement'],
  true,
  4
),
(
  'lighting-controls-installation',
  'Lighting Controls Installation',
  'Smart lighting systems, timers, motion sensors, and whole-home lighting control.',
  'Take control of your home''s lighting with our advanced lighting control installation services. From simple timers and motion sensors to complete smart home lighting systems, we can automate and optimize your lighting for convenience, security, and energy efficiency.',
  'Sliders',
  'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800',
  150,
  'Varies based on system complexity',
  '1-3 hours',
  '["Smart hub integration", "Motion sensor installation", "Timer switch setup", "Dimmer programming", "Scene configuration", "Mobile app setup"]'::jsonb,
  '[{"step": 1, "title": "System Design", "description": "Plan your lighting control setup"}, {"step": 2, "title": "Hardware Install", "description": "Install switches, sensors, and controls"}, {"step": 3, "title": "Programming", "description": "Configure scenes, schedules, and automations"}, {"step": 4, "title": "Training", "description": "Walk you through using your new system"}]'::jsonb,
  '[{"question": "Which smart home systems do you work with?", "answer": "We work with all major platforms including HomeKit, Google Home, Alexa, Lutron, and more."}, {"question": "Can I control lights when away from home?", "answer": "Yes! With smart lighting controls, you can manage your lights from anywhere via smartphone."}]'::jsonb,
  ARRAY['light-switches-replacement', 'ring-camera-installation'],
  true,
  5
),
(
  'power-receptacle-repair',
  'Power Receptacle Repair',
  'Fix outlets that aren''t working, have loose connections, or show signs of damage.',
  'Non-working or damaged outlets can be frustrating and even dangerous. Our repair service diagnoses and fixes outlet issues including loose connections, worn contacts, tripped GFCI circuits, and more. We ensure your outlets are safe and functioning properly.',
  'Plug',
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
  85,
  NULL,
  '30 min - 1 hour',
  '["Diagnostic testing", "Loose connection repair", "GFCI reset/replacement", "Damaged outlet repair", "Wiring inspection", "Safety verification"]'::jsonb,
  '[{"step": 1, "title": "Diagnose", "description": "Test outlet and trace the issue"}, {"step": 2, "title": "Power Off", "description": "Safely disconnect power to the circuit"}, {"step": 3, "title": "Repair", "description": "Fix connections or replace damaged parts"}, {"step": 4, "title": "Test", "description": "Verify proper function and safety"}]'::jsonb,
  '[{"question": "Why did my outlet stop working suddenly?", "answer": "Common causes include tripped GFCI/breaker, loose wiring, or a worn outlet. We''ll diagnose the exact cause."}, {"question": "Is a warm outlet dangerous?", "answer": "A warm outlet can indicate a problem. Contact us to have it inspected as it could be a fire hazard."}]'::jsonb,
  ARRAY['power-receptacle-replacement', 'light-switches-replacement'],
  true,
  6
),
(
  'power-receptacle-replacement',
  'Power Receptacle Replacement',
  'Replace outdated outlets with modern, safer options including USB and GFCI outlets.',
  'Upgrade your outlets for safety, convenience, and style. We replace old 2-prong outlets with grounded 3-prong, install GFCI protection in kitchens and bathrooms, add USB charging outlets, or simply update to match your new décor. All installations meet current electrical codes.',
  'Zap',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  75,
  'Per outlet, outlet not included',
  '20-40 minutes per outlet',
  '["Old outlet removal", "USB outlet installation", "GFCI outlet installation", "Proper grounding verification", "Code-compliant installation", "Cover plate matching"]'::jsonb,
  '[{"step": 1, "title": "Power Off", "description": "Safely turn off the circuit breaker"}, {"step": 2, "title": "Remove", "description": "Disconnect and remove old outlet"}, {"step": 3, "title": "Install", "description": "Wire and mount new outlet securely"}, {"step": 4, "title": "Verify", "description": "Test function and safety features"}]'::jsonb,
  '[{"question": "Can you add grounding to 2-prong outlets?", "answer": "We can upgrade to grounded outlets if ground wire is available, or install GFCI protection as an alternative."}, {"question": "Where do I need GFCI outlets?", "answer": "GFCI outlets are required near water sources: bathrooms, kitchens, garages, and outdoor areas."}]'::jsonb,
  ARRAY['power-receptacle-repair', 'light-switches-replacement'],
  true,
  7
),
(
  'ring-camera-installation',
  'Ring Camera Installation',
  'Professional installation of Ring doorbells, cameras, and security systems.',
  'Enhance your home security with professional Ring device installation. We mount and configure Ring doorbells, indoor and outdoor cameras, and floodlight cameras. Our service includes optimal positioning for best coverage, proper wiring, and full app setup so you can monitor your home from day one.',
  'Camera',
  'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
  125,
  'Device not included',
  '1-2 hours per device',
  '["Optimal camera positioning", "Secure mounting", "Wired or wireless setup", "Doorbell transformer check", "Ring app configuration", "Motion zone setup"]'::jsonb,
  '[{"step": 1, "title": "Site Survey", "description": "Determine best placement for coverage"}, {"step": 2, "title": "Install", "description": "Mount device and connect power/wiring"}, {"step": 3, "title": "Configure", "description": "Set up Ring app and connect to WiFi"}, {"step": 4, "title": "Optimize", "description": "Adjust motion zones and alerts"}]'::jsonb,
  '[{"question": "Do I need existing doorbell wiring for Ring Doorbell?", "answer": "Wired installation provides constant power, but Ring Doorbells also work on battery. We can assess and recommend the best option."}, {"question": "Can you install multiple Ring cameras?", "answer": "Absolutely! We install complete Ring security systems with multiple cameras and devices."}]'::jsonb,
  ARRAY['lighting-controls-installation', 'power-receptacle-replacement'],
  true,
  8
);

-- =====================================================
-- INSERT TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (name, location, rating, text, service, date, is_featured, is_active)
VALUES
('Maria Rodriguez', 'Downtown', 5, 'Absolutely fantastic service! They replaced all my outdated light switches with smart dimmers. The work was clean, professional, and completed faster than expected. My home feels so much more modern now.', 'Light Switches Replacement', '2025-12-15', true, true),
('James Thompson', 'Westside', 5, 'Had three ceiling fans installed in one day. The team was punctual, courteous, and incredibly skilled. They even helped me understand how to use the remote controls. Highly recommend!', 'Ceiling Fan Replacement', '2025-12-08', true, true),
('Sarah Chen', 'Northgate', 5, 'I was worried about installing my Ring doorbell and cameras, but Fix it, papa! made it so easy. They positioned everything perfectly and walked me through the app setup. I feel so much safer now.', 'Ring Camera Installation', '2025-11-28', true, true),
('Michael Brooks', 'Eastbrook', 5, 'Professional, affordable, and reliable. They fixed two dead outlets and replaced my kitchen GFCI in under an hour. Great communication throughout. Will definitely use again!', 'Power Receptacle Repair', '2025-11-20', false, true),
('Lisa Patel', 'Riverside', 5, 'The chandelier installation in my dining room was perfect. They took extra care to ensure it was level and secure. The cleanup was impeccable - you''d never know they were there!', 'Light Fixture Installation', '2025-11-12', false, true),
('David Kim', 'Oak Hills', 5, 'Set up my whole-home Lutron lighting system. They programmed scenes for morning, evening, and movie night. The attention to detail was impressive. Worth every penny!', 'Lighting Controls Installation', '2025-11-05', false, true),
('Jennifer Martinez', 'Lakewood', 5, 'Quick response for an urgent outlet issue. They diagnosed and fixed the problem within 30 minutes. Fair pricing and excellent work ethic. My go-to handyman from now on!', 'Power Receptacle Repair', '2025-10-28', false, true),
('Robert Wilson', 'Greendale', 5, 'Replaced all the old light fixtures in my home office. The new pendant lights look amazing and the work was completed exactly as promised. True professionals!', 'Light Fixture Replacement', '2025-10-15', false, true);

-- =====================================================
-- INSERT DEFAULT SITE SETTINGS
-- =====================================================
INSERT INTO site_settings (key, value, category)
VALUES
('phone', '"(123) 456-7890"', 'contact'),
('email', '"hello@fixitpapa.com"', 'contact'),
('service_area', '"Greater Metro Area"', 'contact'),
('service_radius', '"30 miles"', 'contact'),
('hours_weekday', '"8:00 AM - 6:00 PM"', 'contact'),
('hours_saturday', '"9:00 AM - 4:00 PM"', 'contact'),
('hours_sunday', '"Closed"', 'contact'),
('facebook_url', '""', 'contact'),
('instagram_url', '""', 'contact'),
('twitter_url', '""', 'contact')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- INSERT DEFAULT PAGE CONTENT
-- =====================================================
INSERT INTO page_content (page_key, content)
VALUES
('hero', '{
  "badge_text": "Trusted by 500+ homeowners in the Metro Area",
  "headline": "Expert Electrical &",
  "headline_highlight": "Handyman Services",
  "subheadline": "From ceiling fans to smart home installations, we handle all your electrical needs with precision, reliability, and fair pricing. Licensed professionals, guaranteed satisfaction.",
  "trust_points": ["Licensed & Insured", "Same-Day Service", "Satisfaction Guaranteed"]
}'::jsonb),
('about', '{
  "company_story": "With over a decade of experience in the electrical trade, our founder saw a gap in the market: homeowners needed reliable, fairly-priced help with everyday electrical tasks that didn''t require a full contractor.",
  "years_experience": "10+",
  "jobs_completed": "1,200+",
  "happy_customers": "500+",
  "average_rating": "5.0",
  "certifications": ["Licensed Electrical Contractor", "Fully Insured & Bonded", "EPA Certified", "OSHA Safety Trained", "Smart Home Certified", "Ring Pro Installer"]
}'::jsonb),
('cta', '{
  "headline": "Ready to Get Your Project",
  "headline_highlight": "Done Right?",
  "description": "Get a free quote in minutes. Our friendly team is ready to help with any electrical or handyman project, big or small.",
  "trust_note": "No obligation • Free estimates • Same-day response"
}'::jsonb)
ON CONFLICT (page_key) DO NOTHING;

-- =====================================================
-- INSERT FAQS
-- =====================================================
INSERT INTO faqs (question, answer, category, sort_order, is_active)
VALUES
('What areas do you serve?', 'We serve the Greater Metro Area including Downtown, Westside, Eastbrook, Northgate, Riverside, and surrounding communities within a 30-mile radius.', 'general', 1, true),
('Do you offer emergency services?', 'While we don''t offer 24/7 emergency service, we do our best to accommodate urgent requests. Same-day appointments are often available for critical issues.', 'general', 2, true),
('What payment methods do you accept?', 'We accept all major credit cards, debit cards, cash, and checks. Payment is due upon completion of the work.', 'general', 3, true),
('Do you provide free estimates?', 'Yes! We provide free estimates for all our services. You can use our online quote tool or call us for a personalized estimate.', 'general', 4, true),
('Are you licensed and insured?', 'Absolutely. We are fully licensed electrical contractors and carry comprehensive liability insurance for your protection.', 'general', 5, true),
('Do you guarantee your work?', 'Yes, all our work comes with a satisfaction guarantee. If something isn''t right, we''ll come back and fix it at no additional charge.', 'general', 6, true);

