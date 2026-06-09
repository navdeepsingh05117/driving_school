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
    null
  );
}
