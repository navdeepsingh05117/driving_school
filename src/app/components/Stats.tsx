export default function Stats() {
  const stats = [
    { value: '10,000+', label: 'Students Trained' },
    { value: '98%', label: 'Pass Rate' },
    { value: '50+', label: 'Vehicles' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <section className="scroll-mt-20 bg-[#F5F5F7] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white bg-white/65 p-3 shadow-sm backdrop-blur-xl sm:p-4 lg:p-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex min-h-[128px] cursor-default flex-col items-center justify-center rounded-2xl border border-[#E8EEF6] bg-white px-3 py-5 text-center transition-all hover:-translate-y-1 hover:border-[#D4E7FA] hover:shadow-md sm:min-h-[148px] lg:min-h-[160px] lg:py-8"
            >
              <div className="mb-2 text-4xl font-semibold text-[#1D1D1F] transition-all group-hover:text-[#0071E3] sm:text-5xl lg:mb-3 lg:text-6xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#6E6E73] transition-colors group-hover:text-[#1D1D1F]">
                {stat.label}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
