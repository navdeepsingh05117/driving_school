import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#F5F5F7] to-[#E5E5E7] px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-12">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#0051A8] flex items-center justify-center">
                <span className="font-bold text-white">SD</span>
              </div>
              <span className="text-[#1D1D1F] text-xl font-semibold">
                Saini Driving School
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
              Join thousands of successful drivers who learned
              with our certified instructors. Flexible
              scheduling, modern vehicles, and personalized
              training plans.
            </p>
            <a
              href="https://wa.me/919814712236"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-[#25D366] text-white transition-colors hover:bg-[#20BA5A]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>

          <div>
            <h3 className="text-[#1D1D1F] font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="min-h-11 text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("courses")}
                  className="min-h-11 text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="min-h-11 text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("instructors")}
                  className="min-h-11 text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                >
                  Instructors
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("reviews")}
                  className="min-h-11 text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                >
                  Reviews
                </button>
              </li>
              <li>
                <a
                  href="/admin/login"
                  className="inline-flex min-h-11 items-center text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                >
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#1D1D1F] font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                  Bakarpur, Punjab 140306
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0071E3] mt-1" />
                <div className="text-[#6E6E73] space-y-2">
                  <a
                    href="tel:+919814712236"
                    className="flex min-h-11 items-center hover:text-[#0071E3] transition-colors"
                  >+91 98147 12236</a>
                  <a
                    href="tel:+919855465008"
                    className="flex min-h-11 items-center hover:text-[#0071E3] transition-colors"
                  >
                    +91 98554 65008
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(0,0,0,0.1)] text-center space-y-3">
          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
            &copy; {new Date().getFullYear()} Saini Driving
            School. All rights reserved.
          </p>
          <p className="text-[#6E6E73] text-sm">
            Designed & Developed by{" "}
            <a
              href="https://my-portfolio-seven-ecru-41.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071E3] font-medium hover:underline transition-all"
            >
              Navdeep Singh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
