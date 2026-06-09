export default function Stats() {
  const stats = [
    { value: '10,000+', label: 'Students Trained' },
    { value: '98%', label: 'Pass Rate' },
    { value: '50+', label: 'Vehicles' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:py-16 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-[rgba(0,0,0,0.08)]"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 py-8 sm:py-10 lg:gap-0 lg:py-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex min-h-[112px] flex-col items-center justify-center rounded-2xl bg-white/55 px-3 py-5 text-center group cursor-default lg:min-h-0 lg:rounded-none lg:bg-transparent lg:py-8"
            >
              <div className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#1D1D1F] mb-2 lg:mb-3 transition-all group-hover:-translate-y-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#6E6E73] transition-colors group-hover:text-[#1D1D1F]">
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
