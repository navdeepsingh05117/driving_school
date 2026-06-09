import {
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Courses", id: "courses" },
    
    { label: "Instructors", id: "instructors" },
    { label: "Reviews", id: "reviews" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#F5F5F7] via-white to-[#EEF4FB] px-4 pt-4 pb-7 sm:px-6 sm:pt-5 sm:pb-9">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2rem] border border-white/80 bg-white/75 px-5 py-6 shadow-[0_24px_70px_rgba(0,47,108,0.10)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10">
          <div className="grid divide-y divide-[#DDE7F4] md:grid-cols-[1.35fr_0.8fr_1fr] md:divide-y-0 md:gap-10 lg:gap-12">
            <div className="space-y-5 pb-6 md:pb-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0071E3] to-[#0051A8] shadow-lg shadow-blue-500/20">
                  <span className="text-sm font-semibold tracking-wide text-white">
                    SD
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold leading-tight text-[#1D1D1F] sm:text-xl">
                    Saini Driving School
                  </p>
                  <p className="text-sm text-[#6E6E73]">
                    Safe lessons. Confident drivers.
                  </p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-6 text-[#6E6E73] sm:text-base">
                Learn with patient instructors, flexible timing, and
                road-focused training designed for new drivers in Punjab.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/919814712236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#005BB5] hover:shadow-xl"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+919814712236"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0071E3]/20 bg-white px-5 text-sm font-semibold text-[#0071E3] transition-all hover:-translate-y-0.5 hover:border-[#0071E3]/35 hover:bg-[#F3F8FF]"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="py-6 md:py-0">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#1D1D1F]">
                Quick Links
              </h3>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="group inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#6E6E73] transition-colors hover:text-[#0071E3]"
                    >
                      <span className="h-px w-4 bg-[#C7D8EF] transition-all group-hover:w-6 group-hover:bg-[#0071E3]" />
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="/admin/login"
                    className="group inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#6E6E73] transition-colors hover:text-[#0071E3]"
                  >
                    <span className="h-px w-4 bg-[#C7D8EF] transition-all group-hover:w-6 group-hover:bg-[#0071E3]" />
                    Admin Login
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 md:pt-0">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#1D1D1F]">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#EFF6FF] text-[#0071E3]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-6 text-[#6E6E73] sm:text-base">
                    Bakarpur, Punjab 140306
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#EFF6FF] text-[#0071E3]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="space-y-1 text-sm font-medium text-[#6E6E73] sm:text-base">
                    <a
                      href="tel:+919814712236"
                      className="block transition-colors hover:text-[#0071E3]"
                    >
                      +91 98147 12236
                    </a>
                    <a
                      href="tel:+919855465008"
                      className="block transition-colors hover:text-[#0071E3]"
                    >
                      +91 98554 65008
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#EFF6FF] text-[#0071E3]">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-6 text-[#6E6E73] sm:text-base">
                    Monday to Friday, 7:00 AM - 7:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#DDE7F4] pt-5 text-sm text-[#6E6E73] sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} Saini Driving School. All
              rights reserved.
            </p>
            <a
              href="https://my-portfolio-seven-ecru-41.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#0071E3] transition-colors hover:text-[#005BB5]"
            >
              Designed by Navdeep Singh
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
