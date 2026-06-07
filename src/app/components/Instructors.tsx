import InstructorCard from './InstructorCard';

export default function Instructors() {
  const instructors = [
    {
      name: 'Sarah Johnson',
      specialty: 'Beginner & Nervous Drivers',
      experience: '12 years experience',
      rating: 5,
      certifications: ['ADI Certified', 'Fleet Trainer', 'Pass Plus'],
    },
    {
      name: 'Michael Chen',
      specialty: 'Intensive Courses',
      experience: '10 years experience',
      rating: 5,
      certifications: ['ADI Certified', 'Advanced Driving'],
    },
    {
      name: 'Emma Williams',
      specialty: 'Motorway & Highway',
      experience: '8 years experience',
      rating: 5,
      certifications: ['ADI Certified', 'Defensive Driving'],
    },
    {
      name: 'David Brown',
      specialty: 'Test Preparation',
      experience: '15 years experience',
      rating: 5,
      certifications: ['ADI Certified', 'Mock Test Specialist'],
    },
  ];

  return (
    <section id="instructors" className="py-20 px-6 bg-gradient-to-b from-[#F5F5F7] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4">Meet Our Instructors</h2>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto">
            Learn from experienced, patient, and certified professionals dedicated to your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
