import Link from 'next/link';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO, WHATSAPP_LINK } from '@/lib/constants';
import { getFeaturedTreks } from '@/lib/treks-data';

export default function Footer() {
  const featuredTreks = getFeaturedTreks().slice(0, 4);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-sm mb-4">{COMPANY_INFO.tagline}</p>
            <p className="text-sm">
              Professional trekking guide services in Nepal. Experience the
              Himalayas with expert local guides who prioritize your safety and
              create unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-adventure-orange transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/treks"
                  className="text-sm hover:text-adventure-orange transition-colors"
                >
                  All Treks
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm hover:text-adventure-orange transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-adventure-orange transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-adventure-orange transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Treks */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Popular Treks</h3>
            <ul className="space-y-2">
              {featuredTreks.map((trek) => (
                <li key={trek.id}>
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="text-sm hover:text-adventure-orange transition-colors"
                  >
                    {trek.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-adventure-orange flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-sm hover:text-adventure-orange transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-5 h-5 text-nature-green flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-nature-green transition-colors"
                  >
                    WhatsApp: {COMPANY_INFO.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-adventure-orange flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm hover:text-adventure-orange transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-adventure-orange flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm">{COMPANY_INFO.location}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p className="text-sm mt-2 text-gray-400">
            Professional Trekking Guide Services in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
