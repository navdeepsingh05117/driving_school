import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({ title, price, period, description, features, popular }: PricingCardProps) {
  return (
    <div
      className={`backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all relative ${
        popular ? 'border-[#0071E3] shadow-md' : 'border-[rgba(0,0,0,0.1)]'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[#0071E3] to-[#0051A8] text-white text-sm rounded-full shadow-lg">
          Most Popular
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">{title}</h3>
          <p className="text-[#6E6E73]">{description}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-semibold text-[#1D1D1F]">{price}</span>
          <span className="text-[#6E6E73]">/ {period}</span>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" />
              <span className="text-[#6E6E73]">{feature}</span>
            </div>
          ))}
        </div>

        <button
          className={`w-full px-6 py-3 rounded-full transition-all hover:shadow-lg ${
            popular
              ? 'bg-[#0071E3] text-white hover:bg-[#0051A8]'
              : 'border-2 border-[#0071E3] text-[#0071E3] hover:bg-[#0071E3] hover:text-white'
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
