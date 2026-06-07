export default function Stats() {
  const stats = [
    { value: '10,000+', label: 'Students Trained' },
    { value: '98%', label: 'Pass Rate' },
    { value: '50+', label: 'Vehicles' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <section className="py-16 px-6 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-[rgba(0,0,0,0.08)]"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center py-8 group cursor-default"
            >
              <div className="text-5xl md:text-6xl font-semibold text-[#1D1D1F] mb-3 transition-all group-hover:-translate-y-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#6E6E73] transition-colors group-hover:text-[#1D1D1F]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)]"></div>
      </div>
    </section>
  );
}
