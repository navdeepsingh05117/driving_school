import PricingCard from './PricingCard';

export default function Pricing() {
  const plans = [
    {
      title: 'Single Lesson',
      price: '$45',
      period: 'lesson',
      description: 'Perfect for occasional practice',
      features: [
        '60-minute lesson',
        'Certified instructor',
        'Dual-control vehicle',
        'Flexible scheduling',
        'Pick-up and drop-off',
      ],
    },
    {
      title: 'Package of 10',
      price: '$400',
      period: 'package',
      description: 'Best value for regular learners',
      features: [
        '10 x 60-minute lessons',
        'Save $50 overall',
        'Theory test support',
        'Progress tracking',
        'Free theory materials',
        'Priority booking',
      ],
      popular: true,
    },
    {
      title: 'Full Course',
      price: '$750',
      period: 'course',
      description: 'Complete beginner to test-ready',
      features: [
        '20 x 60-minute lessons',
        'Save $150 overall',
        'Theory and practical support',
        'Mock test included',
        'Test day vehicle use',
        'Unlimited theory access',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4">Transparent Pricing</h2>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto">
            Choose a flexible plan that works for you. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#6E6E73]">
            All prices include GST. Special discounts available for students and seniors.
          </p>
        </div>
      </div>
    </section>
  );
}
