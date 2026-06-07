import { Shield, Clock, Award, HeartHandshake, Car, BookOpen } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Certified Instructors',
      description: 'All our instructors are government-certified with years of teaching experience.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose lesson times that fit your busy lifestyle, including evenings and weekends.',
    },
    {
      icon: Award,
      title: 'High Pass Rate',
      description: 'Our students achieve a 98% first-time pass rate thanks to quality training.',
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Learning',
      description: 'Custom lesson plans tailored to your skill level and learning pace.',
    },
    {
      icon: Car,
      title: 'Modern Fleet',
      description: 'Learn in well-maintained, modern vehicles equipped with dual controls.',
    },
    {
      icon: BookOpen,
      title: 'Theory Support',
      description: 'Free access to our online theory practice platform and study materials.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4">Why Choose DrivePro Academy</h2>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto">
            Experience the difference with our comprehensive approach to driver education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.1)] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all"
              >
                <Icon className="w-7 h-7 text-[#0071E3] mb-6" />
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">{feature.title}</h3>
                <p className="text-[#6E6E73] leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
