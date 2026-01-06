import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const services = [
  { name: "Ceiling Fan Replacement", href: "/services/ceiling-fan-replacement" },
  { name: "Light Fixture Installation", href: "/services/light-fixture-installation" },
  { name: "Switch Upgrades", href: "/services/light-switches-replacement" },
  { name: "Ring Camera Installation", href: "/services/ring-camera-installation" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Get a Quote", href: "/quote" },
  { name: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-charcoal" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white">
                  Fix it, papa!
                </span>
                <span className="block text-xs text-charcoal-400 -mt-1">
                  Handyman Services
                </span>
              </div>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed mb-6">
              Professional electrical and handyman services you can trust. 
              Licensed, reliable, and committed to quality workmanship.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center text-charcoal-400 hover:bg-electric hover:text-charcoal transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center text-charcoal-400 hover:bg-electric hover:text-charcoal transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-charcoal-400 hover:text-electric text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-electric text-sm font-medium hover:text-electric-400 transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-charcoal-400 hover:text-electric text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portal/login"
                  className="text-charcoal-400 hover:text-electric text-sm transition-colors"
                >
                  Customer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-electric mt-0.5" />
                <div>
                  <a
                    href="tel:+1234567890"
                    className="text-charcoal-300 hover:text-white text-sm transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-electric mt-0.5" />
                <div>
                  <a
                    href="mailto:hello@fixitpapa.com"
                    className="text-charcoal-300 hover:text-white text-sm transition-colors"
                  >
                    hello@fixitpapa.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-electric mt-0.5" />
                <span className="text-charcoal-400 text-sm">
                  Serving the Greater Metro Area
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-electric mt-0.5" />
                <div className="text-charcoal-400 text-sm">
                  <p>Mon - Fri: 8AM - 6PM</p>
                  <p>Sat: 9AM - 4PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 text-sm">
            © {new Date().getFullYear()} Fix it, papa! All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-charcoal-500 hover:text-charcoal-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-charcoal-500 hover:text-charcoal-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

