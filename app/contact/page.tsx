import type { Metadata } from 'next';
import { MessageCircle, Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { COMPANY_INFO, WHATSAPP_LINK, INSTAGRAM_LINK } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us - Wander Warriors Trekking',
  description:
    'Get in touch with Wander Warriors for your Nepal trekking plans. Contact us via WhatsApp, phone, or email. Quick response guaranteed.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-mountain-blue to-blue-900 text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto">
            Ready to start your Himalayan adventure? We're here to help plan
            your perfect trek.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 hover:shadow-xl transition-all duration-300 hover:border-nature-green border-2 border-transparent group"
            >
              <div className="w-14 h-14 bg-nature-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nature-green/20 transition-colors">
                <MessageCircle className="w-7 h-7 text-nature-green" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-2">
                Chat with us instantly
              </p>
              <p className="text-nature-green font-semibold">
                {COMPANY_INFO.whatsapp}
              </p>
            </a>

            {/* Phone */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="card p-6 hover:shadow-xl transition-all duration-300 hover:border-adventure-orange border-2 border-transparent group"
            >
              <div className="w-14 h-14 bg-adventure-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-adventure-orange/20 transition-colors">
                <Phone className="w-7 h-7 text-adventure-orange" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm mb-2">Call us directly</p>
              <p className="text-adventure-orange font-semibold">
                {COMPANY_INFO.phone}
              </p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="card p-6 hover:shadow-xl transition-all duration-300 hover:border-mountain-blue border-2 border-transparent group"
            >
              <div className="w-14 h-14 bg-mountain-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-mountain-blue/20 transition-colors">
                <Mail className="w-7 h-7 text-mountain-blue" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-2">Send us an email</p>
              <p className="text-mountain-blue font-semibold break-all text-xs">
                {COMPANY_INFO.email}
              </p>
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 hover:shadow-xl transition-all duration-300 hover:border-pink-500 border-2 border-transparent group"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                <Instagram className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instagram</h3>
              <p className="text-gray-600 text-sm mb-2">Follow our adventures</p>
              <p className="text-pink-500 font-semibold">
                @{COMPANY_INFO.instagram}
              </p>
            </a>

            {/* Location */}
            <div className="card p-6 border-2 border-transparent">
              <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 text-sm mb-2">Based in</p>
              <p className="text-gray-900 font-semibold">
                {COMPANY_INFO.location}
              </p>
            </div>
          </div>

          {/* Quick Contact Section */}
          <div className="card p-8 mb-12 bg-gradient-to-r from-nature-green to-green-700 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <MessageCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Fastest Way to Reach Us
              </h2>
              <p className="text-xl mb-6 text-green-50">
                For immediate assistance and quick responses, contact us on WhatsApp.
                We're available 24/7 to answer your questions and help plan your trek.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-nature-green hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl inline-flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Message Us on WhatsApp
              </a>
            </div>
          </div>

          {/* Response Time Info */}
          <div className="flex items-center justify-center gap-3 mb-12 text-gray-600">
            <Clock className="w-5 h-5 text-adventure-orange" />
            <p className="text-sm">
              We typically respond within 24 hours on all channels
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us an Inquiry
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Contact Wander Warriors?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-adventure-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-adventure-orange" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Customization
                </h3>
                <p className="text-gray-600 text-sm">
                  Every trek is customized to match your preferences, fitness level,
                  and timeline.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-adventure-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-adventure-orange" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Expert Advice
                </h3>
                <p className="text-gray-600 text-sm">
                  Get advice from experienced guides who know these mountains
                  intimately.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-adventure-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-adventure-orange" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-gray-600 text-sm">
                  Clear, upfront quotes with no hidden costs. You'll know exactly
                  what you're paying for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
