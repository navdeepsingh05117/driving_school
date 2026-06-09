import { Star, Award } from 'lucide-react';

interface InstructorCardProps {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  certifications: string[];
}

export default function InstructorCard({ name, specialty, experience, rating, certifications }: InstructorCardProps) {
  return (
    <div className="w-full backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.1)] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0071E3] to-[#0051A8] flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold shadow-lg">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mb-1 leading-tight">{name}</h3>
            <p className="text-[#6E6E73] text-sm sm:text-base">{specialty}</p>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-[#6E6E73]">{rating}.0</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#6E6E73]">
            <Award className="w-4 h-4 text-[#0071E3]" />
            <span>{experience}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-xs text-[#6E6E73] bg-white border border-[rgba(0,0,0,0.1)] rounded-full px-3 py-1.5">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
