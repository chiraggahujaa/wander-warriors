export type DifficultyLevel = 'Easy' | 'Moderate' | 'Challenging';

export type Season = 'Year-round' | 'March-May' | 'September-November' | 'March-November' | 'October-November' | 'March-May, September-November';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude?: string;
  duration?: string;
  meals?: string;
  accommodation?: string;
}

export interface ItineraryOption {
  id: string;
  name: string;
  days: number;
  description: string;
  itinerary: ItineraryDay[];
}

export interface PricingTier {
  groupSize: string;
  pricePerPerson: number;
}

export interface Trek {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  durationDays: number; // For filtering
  difficulty: DifficultyLevel;
  maxAltitude: string;
  maxAltitudeMeters: number;
  bestSeason: Season;
  overview: string[];
  highlights: string[];
  itinerary: string; // Keep for backward compatibility
  itineraryOptions: ItineraryOption[]; // New detailed itineraries
  pricing?: PricingTier[]; // Pricing tiers by group size
  included: string[];
  excluded: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  trekInterest: string;
  numberOfPeople: number;
  preferredDates: string;
  message: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  location: string;
}

export interface Stats {
  label: string;
  value: string;
  description: string;
}

export interface WhyChooseUs {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}
