import * as LucideIcons from 'lucide-react';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;

  return (
    <div className="card p-6 hover:border-adventure-orange border-2 border-transparent transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-adventure-orange/10 rounded-lg flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-adventure-orange" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <LucideIcons.Check className="w-5 h-5 text-nature-green flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
