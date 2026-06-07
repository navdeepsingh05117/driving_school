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
    <div className="backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.1)] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0071E3] to-[#0051A8] flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
          {name.split(' ').map(n => n[0]).join('')}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#1D1D1F] mb-1">{name}</h3>
          <p className="text-[#6E6E73]">{specialty}</p>
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

        <div className="w-full pt-4 border-t border-[rgba(0,0,0,0.1)] space-y-3">
          <div className="flex items-center gap-2 text-sm text-[#6E6E73]">
            <Award className="w-4 h-4 text-[#0071E3]" />
            <span>{experience}</span>
          </div>
          <div className="space-y-1">
            {certifications.map((cert, index) => (
              <div key={index} className="text-xs text-[#6E6E73] border border-[rgba(0,0,0,0.1)] rounded-full px-3 py-1 inline-block mr-1">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
