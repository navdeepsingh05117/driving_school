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
    <section className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-9 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">Why Choose Saini Driving School</h2>
          <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Experience the difference with our comprehensive approach to driver education
          </p>
        </div>

        <div className="grid grid-cols-1 min-[430px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group h-full min-h-[188px] rounded-3xl border border-[#E4ECF5] bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-[#CFE4FA] hover:shadow-[0_22px_55px_rgba(0,47,108,0.10)] sm:p-6 lg:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0071E3] transition-all group-hover:bg-[#0071E3] group-hover:text-white lg:mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1D1D1F] mb-2 lg:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
