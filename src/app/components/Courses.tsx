import CourseCard from './CourseCard';

export default function Courses() {
  const courses = [
    {
      title: 'Beginner Course',
      description: 'Perfect for first-time drivers. Learn the basics and build confidence on the road.',
      duration: '8 weeks',
      lessons: '20 lessons',
      features: [
        'Road safety fundamentals',
        'Basic vehicle controls',
        'Traffic rules and regulations',
        'Parking techniques',
        'Highway driving preparation',
      ],
    },
    {
      title: 'Advanced Course',
      description: 'Take your driving skills to the next level with advanced techniques and scenarios.',
      duration: '6 weeks',
      lessons: '15 lessons',
      features: [
        'Defensive driving strategies',
        'Night and adverse weather driving',
        'Advanced parking maneuvers',
        'Emergency handling',
        'Highway and motorway mastery',
      ],
    },
    {
      title: 'Intensive Course',
      description: 'Fast-track your learning with our intensive program designed for quick results.',
      duration: '2 weeks',
      lessons: '30 lessons',
      features: [
        'Daily practical sessions',
        'Accelerated theory training',
        'Mock test preparation',
        'Personalized attention',
        'Test booking assistance',
      ],
    },
  ];

  return (
    <section id="courses" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4">Our Courses</h2>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto">
            Choose the perfect course tailored to your learning pace and goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
