export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] leading-tight tracking-tight">
              Learn to Drive with Confidence
            </h1>
            <p className="text-xl text-[#6E6E73] leading-relaxed max-w-xl">
              Join thousands of successful drivers who learned with our certified instructors.
              Flexible scheduling, modern vehicles, and personalized training plans.
            </p>
            <div className="flex flex-wrap gap-4">
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

          <div className="relative">
            <div className="backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.1)] rounded-2xl p-8 shadow-lg">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1D1D1F] via-[#3D3D3F] to-[#1D1D1F] shadow-2xl"
                         style={{
                           boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)'
                         }}>
                    </div>

                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#2D2D2F] to-[#1D1D1F]"
                         style={{
                           boxShadow: 'inset 0 -2px 8px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.5)'
                         }}>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#0071E3] to-[#0051A8] shadow-lg"
                         style={{
                           boxShadow: '0 4px 12px rgba(0,113,227,0.5), inset 0 1px 2px rgba(255,255,255,0.3)'
                         }}>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-16 w-2 h-16 bg-gradient-to-b from-[#0071E3] to-[#0051A8] rounded-full shadow-lg origin-bottom rotate-[-30deg]"
                         style={{
                           boxShadow: '0 2px 8px rgba(0,113,227,0.4)'
                         }}>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-20 h-28 rounded-xl bg-gradient-to-br from-[#FFD700] via-[#FFC700] to-[#DAA520] shadow-xl"
                     style={{
                       boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.4), inset 0 -2px 8px rgba(0,0,0,0.3), 0 8px 20px rgba(218,165,32,0.4)'
                     }}>
                  <div className="absolute inset-3 rounded-lg bg-gradient-to-br from-[#1D1D1F] to-[#3D3D3F]"
                       style={{
                         boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
                       }}>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD700] to-[#DAA520]"
                       style={{
                         boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)'
                       }}>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full border-8 border-[#1D1D1F] bg-gradient-to-br from-white via-[#F5F5F7] to-[#E5E5E7]"
                     style={{
                       boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3)'
                     }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0071E3]">0</div>
                      <div className="text-xs text-[#6E6E73]">km/h</div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-12 bg-[#0071E3] rounded-full origin-bottom rotate-0"
                       style={{
                         boxShadow: '0 2px 4px rgba(0,113,227,0.4)'
                       }}>
                  </div>
                </div>

                <div className="absolute top-8 left-4 w-24 h-16 rounded-xl bg-gradient-to-br from-[#4CAF50] via-[#45A049] to-[#3D8B40] shadow-xl"
                     style={{
                       boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.3), 0 6px 16px rgba(76,175,80,0.4)'
                     }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-white">LEARNER</div>
                      <div className="text-[10px] text-white/80">DRIVER</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-16 h-2 rounded-full bg-white shadow-md"
                       style={{
                         boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.5)'
                       }}>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white shadow-md"
                       style={{
                         boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.5)'
                       }}>
                  </div>
                  <div className="w-16 h-2 rounded-full bg-white shadow-md"
                       style={{
                         boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.5)'
                       }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
