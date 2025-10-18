import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Shield, DollarSign, Users, Map, MessageCircle, Heart, Leaf, Mountain } from 'lucide-react';
import { WHY_CHOOSE_US, WHATSAPP_LINK } from '@/lib/constants';
import * as LucideIcons from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Wander Warriors Trekking Guides',
  description:
    'Learn about Wander Warriors, your trusted trekking companions in the Himalayas. Professional guides committed to safety, quality, and authentic experiences.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/about-hero.jpg"
            alt="About Wander Warriors"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About Wander Warriors
          </h1>
          <p className="text-xl md:text-2xl text-gray-100">
            Your Trusted Companions in the Himalayas
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to Wander Warriors
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                We are a team of experienced trekking professionals based in Nepal,
                dedicated to providing exceptional Himalayan adventures. With years of
                combined experience navigating the world's highest mountains, we bring
                expertise, passion, and local knowledge to every trek we guide. Whether you
                need a complete trek package or just an experienced freelance guide, we're
                here to make your journey unforgettable.
              </p>

              <p className="text-lg leading-relaxed">
                Our team consists of licensed, professional guides who have grown up in
                the shadow of the Himalayas. We understand these mountains not just as
                trekking routes, but as our home. This deep connection allows us to offer
                authentic cultural experiences alongside breathtaking natural beauty.
              </p>

              <p className="text-lg leading-relaxed">
                At Wander Warriors, we believe in responsible and sustainable trekking.
                We are committed to supporting local communities, protecting the fragile
                mountain environment, and ensuring fair treatment for all our staff. When
                you trek with us, you're not just having an adventure—you're contributing
                to the wellbeing of the communities you visit.
              </p>

              <p className="text-lg leading-relaxed">
                Safety is our top priority. All our guides are wilderness first aid
                certified and equipped with comprehensive emergency protocols. We maintain
                a 100% safety record because we never compromise on preparation, equipment,
                or decision-making in the mountains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Wander Warriors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to excellence in every aspect of your trekking experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item) => {
              const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
              return (
                <div key={item.id} className="card p-6">
                  <div className="w-14 h-14 bg-adventure-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-adventure-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Promise to You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-nature-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Safe & Memorable Experiences
                  </h3>
                  <p className="text-gray-600">
                    We ensure every trek is conducted with the highest safety standards
                    while creating unforgettable memories.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-nature-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Fair Treatment of Staff
                  </h3>
                  <p className="text-gray-600">
                    Our guides and porters receive fair wages, proper equipment, insurance,
                    and working conditions that exceed industry standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-nature-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Environmental Responsibility
                  </h3>
                  <p className="text-gray-600">
                    We practice Leave No Trace principles and actively contribute to
                    preserving the pristine Himalayan environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-nature-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Cultural Sensitivity
                  </h3>
                  <p className="text-gray-600">
                    We respect and honor the local cultures, traditions, and sacred sites
                    of the communities we visit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-nature-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Complete Transparency
                  </h3>
                  <p className="text-gray-600">
                    Clear, upfront pricing with no hidden costs. You'll know exactly what
                    you're paying for.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nature-green/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-nature-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Commitment to Excellence
                  </h3>
                  <p className="text-gray-600">
                    We continuously improve our services, train our staff, and stay updated
                    with best practices in mountain guiding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-mountain-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Trek with Wander Warriors?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Let's plan your perfect Himalayan adventure together. Contact us on WhatsApp
            for a free consultation and customized itinerary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nature-green hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Contact Us on WhatsApp
            </a>

            <Link
              href="/treks"
              className="bg-white text-mountain-blue hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl inline-block"
            >
              Explore Our Treks
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
