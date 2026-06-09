import AnimatedSvg from './AnimatedSvg';
import drivingSchoolIllustration from '../../imports/illustrations/driving-school-not-css.svg?raw';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h1 className="text-[2.65rem] sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] leading-[1.04] tracking-tight">
              Learn to Drive with Confidence
            </h1>
            <p className="text-lg sm:text-xl text-[#6E6E73] leading-relaxed max-w-xl">
              Join thousands of successful drivers who learned with our certified instructors.
              Flexible scheduling, modern vehicles, and personalized training plans.
            </p>
            <div className="hidden lg:flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-full bg-[#0071E3] text-white hover:bg-[#0051A8] transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Book Your First Lesson
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="px-8 py-4 rounded-full border-2 border-[#0071E3] text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all hover:shadow-lg hover:-translate-y-1"
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
                className="w-full max-w-[24rem] sm:max-w-md lg:max-w-md [&_svg]:h-auto [&_svg]:max-h-[430px] lg:[&_svg]:max-h-[500px] [&_svg]:w-full"
              />
            </div>
          </div>

          <div className="grid gap-3 pt-1 sm:flex sm:flex-wrap lg:hidden">
            <button
              onClick={() => scrollToSection('contact')}
              className="min-h-12 w-full rounded-full bg-[#0071E3] px-6 py-3.5 text-white transition-all hover:bg-[#0051A8] hover:shadow-lg sm:w-auto sm:px-8"
            >
              Book Your First Lesson
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="min-h-12 w-full rounded-full border-2 border-[#0071E3] px-6 py-3.5 text-[#0071E3] transition-all hover:bg-[#0071E3] hover:text-white hover:shadow-lg sm:w-auto sm:px-8"
            >
              View Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
