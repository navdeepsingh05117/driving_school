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
    <div className="h-full rounded-[2rem] border border-[#E4ECF5] bg-white/85 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-[#CFE4FA] hover:shadow-[0_24px_65px_rgba(0,47,108,0.10)] sm:p-6 lg:p-8">
      <div className="flex h-full flex-col space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0071E3]">
            <Quote className="w-5 h-5" />
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
          </div>
        </div>

        <p className="flex-1 text-base text-[#1D1D1F] leading-7 sm:text-lg">{review}</p>

        <div className="pt-4 border-t border-[#E4ECF5]">
          <div className="flex items-center justify-between gap-4">
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
