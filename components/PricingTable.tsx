import { PricingTier } from '@/types';
import { Users } from 'lucide-react';

interface PricingTableProps {
  pricing: PricingTier[];
  currency?: string;
}

export default function PricingTable({ pricing, currency = 'USD' }: PricingTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-adventure-orange to-mountain-blue px-6 py-4">
        <div className="flex items-center gap-2 text-white">
          <Users className="w-5 h-5" />
          <h3 className="text-xl font-bold">Cost per Person ({currency})</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {pricing.map((tier, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-adventure-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-adventure-orange" />
              </div>
              <span className="text-gray-900 font-medium">{tier.groupSize}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-mountain-blue">
                ${tier.pricePerPerson}
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          💡 <strong>Note:</strong> Prices are indicative and may vary based on season,
          services, and specific requirements. Contact us for a detailed quote.
        </p>
      </div>
    </div>
  );
}
