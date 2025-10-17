import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, MessageCircle } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { SERVICES } from '@/lib/services-data';
import { INCLUDED_ITEMS, EXCLUDED_ITEMS, WHATSAPP_LINK } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services - Wander Warriors Trekking',
  description:
    'Professional trekking guide services, porter support, complete trek management, and permit assistance in Nepal. Everything you need for your Himalayan adventure.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/services-hero.jpg"
            alt="Our Trekking Services"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Trekking Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-100">
            Everything You Need for Your Himalayan Adventure
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Trekking Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From expert guides to complete trek management, we provide all the
              services you need for a safe and memorable journey in the Himalayas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Included */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                  <Check className="w-7 h-7 text-nature-green" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  What's Included
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Our standard trekking packages include all essential services to
                ensure a comfortable and safe journey:
              </p>

              <ul className="space-y-3">
                {INCLUDED_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-nature-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  What's NOT Included
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                The following items are not included in our standard packages but
                can be arranged upon request:
              </p>

              <ul className="space-y-3">
                {EXCLUDED_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Important Information
              </h3>

              <div className="space-y-6 text-gray-700">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Permit Processing
                  </h4>
                  <p>
                    We assist with obtaining all necessary permits for your trek.
                    However, please note that your presence (passport photocopy and
                    photos) is required for permit processing. We handle all the
                    paperwork and guide you through the process.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Porter Ratio
                  </h4>
                  <p>
                    We maintain a 2:1 porter ratio, meaning one porter for every two
                    trekkers. Each porter carries up to 25kg, which typically includes
                    baggage from two trekkers. This ensures fair working conditions for
                    our porters while meeting your needs.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Freelance Guide Services
                  </h4>
                  <p>
                    If you prefer to organize other aspects of your trek independently,
                    we offer guide-only services. Our experienced guides can join you
                    for just the trekking portion while you manage accommodation,
                    permits, and other logistics yourself.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Customization Available
                  </h4>
                  <p>
                    All our services can be customized to match your specific needs,
                    budget, and preferences. Whether you want to add extra services or
                    reduce the package, we're flexible and happy to create a
                    personalized plan for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-adventure-orange to-orange-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Trek?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us on WhatsApp to discuss your needs and get a customized
            quote for your Himalayan adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-adventure-orange hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Get a Custom Quote
            </a>

            <Link
              href="/treks"
              className="bg-mountain-blue hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl inline-block"
            >
              View Available Treks
            </Link>
          </div>

          <p className="mt-6 text-white/90">
            No hidden fees | Transparent pricing | Free consultation
          </p>
        </div>
      </section>
    </>
  );
}
