import Link from 'next/link';
import { Award, Shield, DollarSign, Users, Map, MessageCircle } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import TrekCard from '@/components/TrekCard';
import { getFeaturedTreks } from '@/lib/treks-data';
import { STATS, WHY_CHOOSE_US, WHATSAPP_LINK } from '@/lib/constants';
import * as LucideIcons from 'lucide-react';

export default function HomePage() {
  const featuredTreks = getFeaturedTreks();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Discover Nepal's Himalayas with Wander Warriors"
        subtitle="Expert Guides | Complete Trek Management | Unforgettable Adventures"
        backgroundImage="/images/hero/main-hero.jpg"
        showCTA={true}
      />

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-adventure-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treks Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Treks
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular trekking routes in the Nepal Himalayas.
              Each trek offers unique experiences and breathtaking views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTreks.map((trek) => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/treks" className="btn-primary">
              View All Treks
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Trek With Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing the best trekking experience in
              Nepal with safety, quality, and authenticity at the forefront.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item) => {
              const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
              return (
                <div key={item.id} className="text-center">
                  <div className="w-16 h-16 bg-adventure-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-adventure-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-mountain-blue text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              From professional guides to complete trek management, we provide
              everything you need for a successful Himalayan adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
              <Users className="w-12 h-12 text-adventure-orange mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
              <p className="text-gray-200">
                Licensed, experienced guides with deep local knowledge and
                first-aid certification.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
              <Map className="w-12 h-12 text-adventure-orange mb-4" />
              <h3 className="text-xl font-bold mb-2">Complete Management</h3>
              <p className="text-gray-200">
                We handle permits, accommodation, transportation, and all
                logistics for your trek.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
              <Shield className="w-12 h-12 text-adventure-orange mb-4" />
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-gray-200">
                Your safety is our priority with proper equipment, emergency
                protocols, and 24/7 support.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="bg-white text-mountain-blue hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-adventure-orange to-orange-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us on WhatsApp to discuss your trekking plans and get a
            customized itinerary for your Himalayan journey.
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-adventure-orange hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl inline-flex items-center gap-3"
          >
            <MessageCircle className="w-6 h-6" />
            Message Us on WhatsApp
          </a>

          <p className="mt-6 text-white/90">
            Available 24/7 | Quick Response | Free Consultation
          </p>
        </div>
      </section>
    </>
  );
}
