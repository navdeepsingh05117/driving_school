import ReviewCard from './ReviewCard';

export default function Reviews() {
  const reviews = [
    {
      name: 'Jessica Martinez',
      course: 'Beginner Course',
      rating: 5,
      review: 'Sarah was incredibly patient and made me feel comfortable from day one. I passed my test on the first try! The structured lessons and clear explanations helped me build confidence quickly.',
      date: 'May 2026',
    },
    {
      name: 'Tom Anderson',
      course: 'Intensive Course',
      rating: 5,
      review: 'Michael\'s intensive course was exactly what I needed. Two weeks and I was test-ready. His teaching methods are efficient and effective. Highly recommend for anyone in a hurry!',
      date: 'April 2026',
    },
    {
      name: 'Priya Patel',
      course: 'Advanced Course',
      rating: 5,
      review: 'Emma helped me overcome my highway driving anxiety. Her calm demeanor and expert guidance made all the difference. Now I drive confidently anywhere!',
      date: 'March 2026',
    },
    {
      name: 'James Wilson',
      course: 'Full Course',
      rating: 5,
      review: 'David prepared me thoroughly for my test. The mock tests were invaluable. Passed with only 2 minors! Best driving school in the area without a doubt.',
      date: 'February 2026',
    },
    {
      name: 'Lisa Chen',
      course: 'Beginner Course',
      rating: 5,
      review: 'As a nervous driver, I was worried about learning. The instructors at DrivePro were so supportive. They celebrated every small win with me. Couldn\'t have done it without them!',
      date: 'January 2026',
    },
    {
      name: 'Ryan Murphy',
      course: 'Package of 10',
      rating: 5,
      review: 'Flexible scheduling was perfect for my work schedule. Modern cars, professional instructors, and great value for money. What more could you ask for?',
      date: 'December 2025',
    },
  ];

  return (
    <section id="reviews" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4">What Our Students Say</h2>
          <p className="text-xl text-[#6E6E73] max-w-2xl mx-auto">
            Join thousands of satisfied students who achieved their driving goals with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
