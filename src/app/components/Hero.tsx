import AnimatedSvg from './AnimatedSvg';
import drivingSchoolIllustration from '../../imports/illustrations/driving-school-not-css.svg?raw';
import { BadgeCheck, CalendarClock, Route } from 'lucide-react';

export default function Hero() {
  const trustBadges = [
    { label: 'Certified Instructors', icon: BadgeCheck },
    { label: 'Flexible Timing', icon: CalendarClock },
    { label: 'Road-Test Ready', icon: Route },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="scroll-mt-20 px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-7 lg:space-y-8">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFA] bg-[#F4F9FF] px-4 py-2 text-sm font-semibold text-[#0071E3]">
              <BadgeCheck className="h-4 w-4" />
              Punjab's trusted local driving school
            </div> */}

            <h1 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold text-[#1D1D1F] leading-[0.98]">
              Learn to Drive with Real Confidence
            </h1>
            <p className="text-lg sm:text-xl text-[#6E6E73] leading-relaxed max-w-2xl">
              Patient instructors, modern vehicles, and road-focused training that prepares
              you for real traffic, safer habits, and your driving test.
            </p>

            <div className="grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {trustBadges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(0,113,227,0.14)] bg-white px-4 text-sm font-medium text-[#1D1D1F] shadow-sm"
                >
                  <Icon className="h-4 w-4 text-[#0071E3]" />
                  {label}
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <button
                onClick={() => scrollToSection('contact')}
                className="min-h-[52px] rounded-full bg-[#0071E3] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-[#0051A8] hover:shadow-xl"
              >
                Book Trial Lesson
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="min-h-[52px] rounded-full border border-[#0071E3]/30 bg-white px-8 py-4 text-base font-semibold text-[#0071E3] transition-all hover:-translate-y-1 hover:border-[#0071E3] hover:bg-[#F3F8FF]"
              >
                View Courses
              </button>
            </div>
          </div>

          <div className="relative -mt-2 lg:mt-0">
            <div className="flex items-center justify-center">
              <AnimatedSvg
                svg={drivingSchoolIllustration}
                label="Driving school illustration"
                className="w-full max-w-[25rem] sm:max-w-lg lg:max-w-xl [&_svg]:h-auto [&_svg]:max-h-[360px] sm:[&_svg]:max-h-[460px] lg:[&_svg]:max-h-[540px] [&_svg]:w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
