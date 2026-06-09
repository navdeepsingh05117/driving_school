import AnimatedSvg from './AnimatedSvg';
import CourseCard from './CourseCard';
import checklistIllustration from '../../imports/illustrations/personal-goals-checklist-not-css.svg?raw';

export default function Courses() {
  const courses = [
    {
      title: 'Complete Driving Course',
      description: 'Comprehensive one-month program covering everything you need to become a confident driver.',
      duration: '1 month',
      lessons: '20 lessons',
      features: [
        'Road practice sessions',
        'Theory practice and training',
        'Traffic rules and regulations',
        'Defensive driving techniques',
        'Test preparation and guidance',
      ],
    },
  ];

  return (
    <section id="courses" className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">Our Courses</h2>
          <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Choose the perfect course tailored to your learning pace and goals
          </p>
        </div>

        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="order-2 lg:order-1">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <AnimatedSvg
              svg={checklistIllustration}
              label="Personal goals checklist illustration"
              className="w-full max-w-[23rem] sm:max-w-lg [&_svg]:h-auto [&_svg]:max-h-[380px] sm:[&_svg]:max-h-[460px] [&_svg]:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
