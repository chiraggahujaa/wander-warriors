import { CompanyInfo, Stats, WhyChooseUs } from '@/types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'Wander Warriors',
  tagline: 'Your Trusted Companions in the Himalayas',
  phone: '+977 9864261982',
  whatsapp: '+977 9864261982',
  email: 'sherpaangdawa092@gmail.com',
  instagram: 'warriorswander',
  location: 'Nepal',
};

export const WHATSAPP_LINK = `https://wa.me/9779864261982`;

export const INSTAGRAM_LINK = `https://instagram.com/${COMPANY_INFO.instagram}`;

export const STATS: Stats[] = [
  {
    label: '7+ Trek Options',
    value: '7+',
    description: 'From easy to challenging routes',
  },
  {
    label: 'Happy Trekkers',
    value: '100+',
    description: 'Guided successfully',
  },
  {
    label: 'Combined Experience',
    value: '15+',
    description: 'Years of expert local knowledge',
  },
  {
    label: 'Safety Record',
    value: '100%',
    description: 'Your wellbeing is our priority',
  },
];

export const WHY_CHOOSE_US: WhyChooseUs[] = [
  {
    id: '1',
    title: 'Experienced Team',
    description: 'All guides are licensed, trained, and have years of experience in the Himalayas',
    icon: 'Award',
  },
  {
    id: '2',
    title: 'Safety First',
    description: 'Wilderness first aid certified with comprehensive emergency protocols',
    icon: 'Shield',
  },
  {
    id: '3',
    title: 'Best Value',
    description: 'Competitive pricing with complete transparency and no hidden costs',
    icon: 'DollarSign',
  },
  {
    id: '4',
    title: 'Personalized Service',
    description: 'Flexible itineraries tailored to your needs with small group focus',
    icon: 'Users',
  },
  {
    id: '5',
    title: 'Local Knowledge',
    description: 'Authentic cultural experiences with insider knowledge of the best routes',
    icon: 'Map',
  },
  {
    id: '6',
    title: '24/7 Support',
    description: 'Available on WhatsApp anytime for questions or assistance',
    icon: 'MessageCircle',
  },
];

export const INCLUDED_ITEMS = [
  'Experienced trekking guide',
  'Porter service (2:1 ratio - 1 porter per 2 trekkers)',
  'All meals during trek (breakfast, lunch, dinner)',
  'Teahouse/lodge accommodation during trek',
  'All necessary trekking permits and fees',
  'First aid kit and safety equipment',
  'Guide and porter insurance, meals, accommodation, salary',
];

export const EXCLUDED_ITEMS = [
  'International flights',
  'Nepal entry visa fee',
  'Travel insurance',
  'Meals in Kathmandu/Pokhara',
  'Personal expenses (drinks, WiFi, batteries, etc.)',
  'Tips for guide and porters',
  'Emergency evacuation insurance',
  'Personal trekking gear',
];
