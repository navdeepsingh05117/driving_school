export default function Showcase() {
  const stats = [
    { value: "10,000+", label: "Students Trained" },
    { value: "98%", label: "Pass Rate" },
    { value: "15+", label: "Years Experience" },
  ];

  return (
    <section className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-[#DDE7F4] bg-gradient-to-br from-white via-[#F8FBFF] to-[#EEF6FF] shadow-[0_24px_70px_rgba(0,47,108,0.10)]">
          <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-12">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0071E3]">
                Trusted Training
              </p>
              <h2 className="mb-4 text-3xl font-semibold leading-tight text-[#1D1D1F] sm:text-4xl lg:text-5xl">
                Punjab's Trusted Driving School
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[#6E6E73] sm:text-xl">
                Learn with experienced instructors, modern vehicles, and
                road-focused training designed for real confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white bg-white/80 px-4 py-5 text-center shadow-sm"
                  >
                    <div className="text-3xl font-semibold text-[#1D1D1F] sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-[#6E6E73]">
                      {stat.label}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
