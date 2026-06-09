import { Star, Quote } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  course: string;
  rating: number;
  review: string;
  date: string;
}

export default function ReviewCard({ name, course, rating, review, date }: ReviewCardProps) {
  return (
    <div className="h-full backdrop-blur-xl bg-[rgba(255,255,255,0.72)] border border-[rgba(0,0,0,0.1)] rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all">
      <div className="flex h-full flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#0071E3] opacity-30" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="flex-1 text-sm sm:text-base text-[#1D1D1F] leading-relaxed italic">{review}</p>

        <div className="pt-4 border-t border-[rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-[#1D1D1F]">{name}</h4>
              <p className="text-sm text-[#6E6E73]">{course}</p>
            </div>
            <span className="text-xs text-[#6E6E73]">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
