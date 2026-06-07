import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#F5F5F7] to-[#E5E5E7] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#0051A8] flex items-center justify-center">
                <span className="font-bold text-white">DP</span>
              </div>
              <span className="text-[#1D1D1F] text-xl font-semibold">DrivePro Academy</span>
            </div>
            <p className="text-[#6E6E73] leading-relaxed">
              Your trusted partner in learning to drive with confidence. Professional instruction, modern vehicles, flexible schedules.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#0071E3] hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#0071E3] hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#0071E3] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#0071E3] hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#1D1D1F] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('courses')} className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('instructors')} className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  Instructors
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reviews')} className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#1D1D1F] font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li className="text-[#6E6E73]">Beginner Course</li>
              <li className="text-[#6E6E73]">Advanced Course</li>
              <li className="text-[#6E6E73]">Intensive Course</li>
              <li className="text-[#6E6E73]">Single Lessons</li>
              <li className="text-[#6E6E73]">Package Deals</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#1D1D1F] font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" />
                <span className="text-[#6E6E73]">123 Learning Lane, Drivetown, DT 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0071E3]" />
                <a href="tel:+1234567890" className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0071E3]" />
                <a href="mailto:info@drivepro.com" className="text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                  info@drivepro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(0,0,0,0.1)] text-center space-y-2">
          <p className="text-[#6E6E73]">
            &copy; {new Date().getFullYear()} DrivePro Academy. All rights reserved.
          </p>
          <p className="text-[#6E6E73] text-sm">
            Designed & Developed by <span className="text-[#0071E3] font-medium">Navdeep Singh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
