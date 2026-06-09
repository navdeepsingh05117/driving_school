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
    <div className="h-full overflow-hidden rounded-[1.5rem] border border-[#E4ECF5] bg-white/85 p-4 shadow-sm backdrop-blur-xl transition-all hover:border-[#CFE4FA] hover:shadow-[0_18px_45px_rgba(0,47,108,0.08)] sm:rounded-[2rem] sm:p-6 sm:hover:-translate-y-2 lg:p-8 lg:hover:shadow-[0_24px_65px_rgba(0,47,108,0.10)]">
      <div className="flex h-full min-w-0 flex-col space-y-4 sm:space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0071E3] sm:h-11 sm:w-11">
            <Quote className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                  index < rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="flex-1 whitespace-normal break-words text-sm leading-6 text-[#1D1D1F] sm:text-base sm:leading-7 lg:text-lg">{review}</p>

        <div className="border-t border-[#E4ECF5] pt-3 sm:pt-4">
          <div className="flex min-w-0 items-start justify-between gap-3 sm:items-center sm:gap-4">
            <div className="min-w-0">
              <h4 className="break-words text-sm font-semibold text-[#1D1D1F] sm:text-base">{name}</h4>
              <p className="break-words text-xs text-[#6E6E73] sm:text-sm">{course}</p>
            </div>
            <span className="shrink-0 text-xs text-[#6E6E73]">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
