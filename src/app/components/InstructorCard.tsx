import { Award, Languages, Star } from 'lucide-react';

interface InstructorCardProps {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  certifications: string[];
  languages: string[];
}

export default function InstructorCard({ name, specialty, experience, rating, certifications, languages }: InstructorCardProps) {
  const scrollToBooking = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full rounded-[2rem] border border-[#DDE7F4] bg-white/85 p-5 shadow-[0_18px_50px_rgba(0,47,108,0.08)] backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-[#CFE4FA] hover:shadow-[0_26px_70px_rgba(0,47,108,0.12)] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0071E3] to-[#0051A8] text-2xl font-semibold text-white shadow-lg shadow-blue-500/20 sm:h-28 sm:w-28 sm:text-3xl">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
          <div>
            <div className="mb-2 flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-[#6E6E73]">{rating}.0 rated</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-1 leading-tight">{name}</h3>
            <p className="text-[#6E6E73] text-sm sm:text-base">{specialty}</p>
          </div>

          <div className="grid gap-2 text-sm text-[#6E6E73] sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-2xl bg-[#F8FBFF] px-3 py-2">
              <Award className="w-4 h-4 text-[#0071E3]" />
              <span>{experience}</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-[#F8FBFF] px-3 py-2">
              <Languages className="w-4 h-4 text-[#0071E3]" />
              <span>{languages.join(', ')}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-xs font-medium text-[#6E6E73] bg-white border border-[#E4ECF5] rounded-full px-3 py-1.5">
                {cert}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
