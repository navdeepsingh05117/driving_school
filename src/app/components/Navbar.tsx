import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const startPosition = window.scrollY;
      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - navOffset;
      const distance = targetPosition - startPosition;
      const duration = 900;
      const startTime = performance.now();

      const easeInOutCubic = (time: number) =>
        time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo({
          top: startPosition + distance * easeInOutCubic(progress),
        });

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border-b border-[rgba(0,0,0,0.1)] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#0051A8] flex items-center justify-center">
              <span className="font-bold text-white">SD</span>
            </div>
            <span className="text-[#1D1D1F] text-xl font-semibold">Saini Driving School</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('courses')} className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Courses
            </button>

            <button onClick={() => scrollToSection('instructors')} className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Instructors
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Contact
            </button>
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 rounded-full bg-[#0071E3] text-white hover:bg-[#0051A8] transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Book Trial Lesson
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1D1D1F]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-5 duration-300">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('courses')} className="block w-full text-left py-2 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Courses
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('instructors')} className="block w-full text-left py-2 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Instructors
            </button>
            <button onClick={() => scrollToSection('reviews')} className="block w-full text-left py-2 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full px-6 py-2.5 rounded-full bg-[#0071E3] text-white hover:bg-[#0051A8] transition-all"
            >
              Book Trial Lesson
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
