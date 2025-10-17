import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Mountain, TrendingUp } from 'lucide-react';
import { Trek } from '@/types';

interface TrekCardProps {
  trek: Trek;
}

export default function TrekCard({ trek }: TrekCardProps) {
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

  return (
    <Link href={`/treks/${trek.slug}`} className="card group overflow-hidden block">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={trek.images.hero}
          alt={trek.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4">
          <span className={`${getDifficultyColor(trek.difficulty)} px-3 py-1 rounded-full text-sm font-semibold`}>
            {trek.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-adventure-orange transition-colors">
          {trek.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trek.tagline}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-adventure-orange" />
            <span>{trek.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Mountain className="w-4 h-4 text-adventure-orange" />
            <span>Max Altitude: {trek.maxAltitude}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <TrendingUp className="w-4 h-4 text-adventure-orange" />
            <span>Difficulty: {trek.difficulty}</span>
          </div>
        </div>

        <div className="mt-6">
          <span className="text-adventure-orange font-semibold text-sm group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
