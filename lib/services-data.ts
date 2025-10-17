import { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Professional Trekking Guides',
    description: 'Our experienced, licensed guides ensure your safety and enrich your journey with deep knowledge of routes, culture, and the Himalayas.',
    icon: 'User',
    features: [
      'Licensed and trained professional guides',
      'Fluent in English communication',
      'Wilderness first aid certified',
      'Deep knowledge of routes and local culture',
      'Expert in mountain safety protocols',
      'Friendly and experienced companions',
    ],
  },
  {
    id: '2',
    title: 'Reliable Porter Services',
    description: 'Well-equipped and experienced porters to carry your gear, allowing you to trek comfortably and enjoy the journey.',
    icon: 'Backpack',
    features: [
      'Experienced and well-equipped porters',
      'Fair wages and proper working conditions',
      'Carry up to 25kg per porter',
      '2:1 ratio (one porter for two trekkers)',
      'Professional and friendly service',
      'Fully insured and protected',
    ],
  },
  {
    id: '3',
    title: 'Assistant Guides for Groups',
    description: 'For larger groups of 6+ trekkers, we provide assistant guides to ensure better safety, support, and group management.',
    icon: 'Users',
    features: [
      'Available for groups of 6 or more',
      'Enhanced safety and support',
      'Better group management',
      'Additional local expertise',
      'Improved emergency response',
      'More personalized attention',
    ],
  },
  {
    id: '4',
    title: 'Complete Trek Management',
    description: 'We handle all logistics so you can focus on enjoying your adventure. From hotels to transportation, we take care of everything.',
    icon: 'ClipboardList',
    features: [
      'Hotel booking in Kathmandu/Pokhara',
      'All transportation arrangements',
      'Teahouse accommodation bookings during trek',
      'Vehicle hire for trailhead access',
      'Airport pickup and drop-off service',
      'Complete itinerary planning',
    ],
  },
  {
    id: '5',
    title: 'Permit Assistance',
    description: 'We help you obtain all necessary trekking permits and documentation, making the process smooth and hassle-free.',
    icon: 'FileText',
    features: [
      'Assistance with all permit applications',
      'TIMS card processing',
      'National park entry permits',
      'Restricted area permits (Manaslu, Mustang, etc.)',
      'Conservation area permits',
      'Note: Guest presence required for permit processing',
    ],
  },
  {
    id: '6',
    title: 'Freelance Guide Services',
    description: 'Need just a guide for your trek? We offer flexible guide-only services for independent trekkers who prefer to manage other aspects themselves.',
    icon: 'MapPin',
    features: [
      'Guide-only service available',
      'Perfect for independent trekkers',
      'Flexible arrangements',
      'Professional support and expertise',
      'Customizable to your needs',
      'Competitive daily rates',
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find(service => service.id === id);
}

export function getAllServices(): Service[] {
  return SERVICES;
}
