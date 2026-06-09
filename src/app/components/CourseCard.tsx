import { ArrowRight, Calendar, CheckCircle, Clock } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  lessons: string;
  features: string[];
}

export default function CourseCard({ title, description, duration, lessons, features }: CourseCardProps) {
  const scrollToBooking = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full rounded-[2rem] border border-[#DDE7F4] bg-white/85 p-5 shadow-[0_24px_70px_rgba(0,47,108,0.10)] backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,47,108,0.14)] sm:p-7 lg:p-8">
      <div className="space-y-6">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0071E3]">
            One complete program
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] mb-2 sm:mb-3">{title}</h3>
          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-[#E8EEF6] bg-[#F8FBFF] p-4 text-[#6E6E73]">
            <Clock className="w-4 h-4 text-[#0071E3]" />
            <span className="mt-2 block font-semibold text-[#1D1D1F]">{duration}</span>
            <span className="text-xs">Duration</span>
          </div>
          <div className="rounded-2xl border border-[#E8EEF6] bg-[#F8FBFF] p-4 text-[#6E6E73]">
            <Calendar className="w-4 h-4 text-[#0071E3]" />
            <span className="mt-2 block font-semibold text-[#1D1D1F]">{lessons}</span>
            <span className="text-xs">Practice plan</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-[#6E6E73]">{feature}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollToBooking}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-[#0051A8] hover:shadow-xl"
        >
          Enroll Now
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
