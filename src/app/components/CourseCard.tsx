import { Clock, Calendar, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  lessons: string;
  features: string[];
}

export default function CourseCard({ title, description, duration, lessons, features }: CourseCardProps) {
  return (
    <div className="w-full backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.1)] rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all">
      <div className="space-y-5 lg:space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mb-2 sm:mb-3">{title}</h3>
          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
          <div className="flex items-center gap-2 text-[#6E6E73]">
            <Clock className="w-4 h-4 text-[#0071E3]" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6E6E73]">
            <Calendar className="w-4 h-4 text-[#0071E3]" />
            <span>{lessons}</span>
          </div>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-[#6E6E73]">{feature}</span>
            </div>
          ))}
        </div>

        <button className="min-h-12 w-full px-6 py-3 rounded-full bg-[#0071E3] text-white hover:bg-[#0051A8] transition-all hover:shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  );
}
