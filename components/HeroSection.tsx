import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mountain } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  showCTA?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  showCTA = true,
}: HeroSectionProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 text-balance">
            {subtitle}
          </p>

          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/treks" className="btn-primary inline-flex items-center gap-2">
                <Mountain className="w-5 h-5" />
                Explore Treks
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-nature-green hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Us on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
