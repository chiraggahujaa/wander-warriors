import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Mountain, TrendingUp, Sun, Check, X, MessageCircle, ArrowLeft } from 'lucide-react';
import { getTrekBySlug, getAllTrekSlugs } from '@/lib/treks-data';
import { WHATSAPP_LINK } from '@/lib/constants';
import ItineraryTabs from '@/components/ItineraryTabs';
import PricingTable from '@/components/PricingTable';
import CommentsSection from '@/components/CommentsSection';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllTrekSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const trek = getTrekBySlug(params.slug);

  if (!trek) {
    return {
      title: 'Trek Not Found',
    };
  }

  return {
    title: `${trek.name} - Wander Warriors Trekking`,
    description: trek.tagline + ' ' + trek.overview[0],
  };
}

export default function TrekDetailPage({ params }: PageProps) {
  const trek = getTrekBySlug(params.slug);

  if (!trek) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-nature-green text-white';
      case 'Moderate':
        return 'bg-adventure-orange text-white';
      case 'Challenging':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Wander Warriors, I'm interested in the ${trek.name} and would like more information.`
  );
  const trekWhatsAppLink = `${WHATSAPP_LINK}?text=${whatsappMessage}`;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src={trek.images.hero}
          alt={trek.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-12 text-white">
            <Link
              href="/treks"
              className="inline-flex items-center gap-2 text-white hover:text-adventure-orange transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Treks
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className={`${getDifficultyColor(trek.difficulty)} px-4 py-2 rounded-full text-sm font-semibold`}>
                {trek.difficulty}
              </span>
              {trek.featured && (
                <span className="bg-adventure-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Popular
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {trek.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl">
              {trek.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Trek Facts */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-adventure-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-adventure-orange" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-bold text-gray-900">{trek.duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-adventure-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mountain className="w-6 h-6 text-adventure-orange" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Max Altitude</div>
                <div className="font-bold text-gray-900">{trek.maxAltitude}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-adventure-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-adventure-orange" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Difficulty</div>
                <div className="font-bold text-gray-900">{trek.difficulty}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-adventure-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sun className="w-6 h-6 text-adventure-orange" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Best Season</div>
                <div className="font-bold text-gray-900 text-sm">{trek.bestSeason}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Trek Overview
                </h2>
                <div className="space-y-4 text-gray-700">
                  {trek.overview.map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Trek Highlights
                </h2>
                <ul className="grid grid-cols-1 gap-3">
                  {trek.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-nature-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Day-by-Day Itinerary */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Detailed Day-by-Day Itinerary
                </h2>
                {trek.itineraryOptions && trek.itineraryOptions.length > 0 ? (
                  <ItineraryTabs itineraryOptions={trek.itineraryOptions} />
                ) : (
                  <div className="card p-6">
                    <p className="text-gray-700 leading-relaxed">{trek.itinerary}</p>
                    <p className="mt-4 text-sm text-gray-600">
                      Note: This is a general itinerary outline. Contact us for a detailed day-by-day breakdown.
                    </p>
                  </div>
                )}
              </div>

              {/* Pricing */}
              {trek.pricing && trek.pricing.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Pricing
                  </h2>
                  <PricingTable pricing={trek.pricing} />
                </div>
              )}

              {/* What's Included/Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-6 h-6 text-nature-green" />
                    <h3 className="text-xl font-bold text-gray-900">Included</h3>
                  </div>
                  <ul className="space-y-2">
                    {trek.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-nature-green flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <X className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">Not Included</h3>
                  </div>
                  <ul className="space-y-2">
                    {trek.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking CTA */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Interested in this trek?
                </h3>
                <p className="text-gray-600 mb-6">
                  Contact us on WhatsApp to get a customized quote and detailed
                  itinerary for this trek.
                </p>

                <a
                  href={trekWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center mb-4"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire on WhatsApp
                </a>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-bold text-gray-900 mb-3">Quick Facts</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{trek.duration}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-semibold">{trek.difficulty}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Max Altitude:</span>
                      <span className="font-semibold">{trek.maxAltitude}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Best Season:</span>
                      <span className="font-semibold text-right">{trek.bestSeason}</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-xs text-gray-600">
                    We typically respond within 24 hours. Our team will help you plan
                    the perfect itinerary and provide transparent pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Trek Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trek.images.gallery.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`${trek.name} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Images are for illustrative purposes. Actual views may vary.
          </p>
        </div>
      </section>

      {/* Comments Section */}
      <CommentsSection trekSlug={trek.slug} trekName={trek.name} />
    </>
  );
}
