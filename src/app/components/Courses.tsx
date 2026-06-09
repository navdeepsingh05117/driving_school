import AnimatedSvg from './AnimatedSvg';
import CourseCard from './CourseCard';
import checklistIllustration from '../../imports/illustrations/personal-goals-checklist-not-css.svg?raw';

export default function Courses() {
  const courses = [
    {
      title: 'Complete Driving Course',
      description: 'Comprehensive one-month program covering everything you need to become a confident driver.',
      duration: '4 Weeks',
      lessons: '20 Lessons',
      features: [
        'Road Practice Sessions',
        'Theory + Practical Training',
        'Traffic Rules and Regulations',
        'Defensive Driving Techniques',
        'Test Preparation',
      ],
    },
  ];

  return (
    <section id="courses" className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">Our Courses</h2>
          <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Choose the perfect course tailored to your learning pace and goals
          </p>
        </div>

        <div className="grid items-center gap-6 rounded-[2rem] border border-[#E4ECF5] bg-gradient-to-br from-[#F8FBFF] to-white p-4 shadow-sm sm:gap-8 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:p-8">
          <div className="order-2 lg:order-1">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <AnimatedSvg
              svg={checklistIllustration}
              label="Personal goals checklist illustration"
              className="w-full max-w-[20rem] sm:max-w-md lg:max-w-lg [&_svg]:h-auto [&_svg]:max-h-[300px] sm:[&_svg]:max-h-[420px] lg:[&_svg]:max-h-[480px] [&_svg]:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
