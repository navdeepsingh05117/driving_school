import { useRef, useState } from "react";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const [activeReview, setActiveReview] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Prabhjot Singh",
      course: "Complete Driving Course",
      rating: 5,
      review:
        "The lessons were well organized and easy to understand. The road practice sessions helped me gain confidence quickly, and I passed my driving test on my first attempt.",
      date: "May 2026",
    },
    {
      name: "Gurpreet Kaur",
      course: "Complete Driving Course",
      rating: 5,
      review:
        "I was nervous about driving at first, but the training made everything simple. The practical sessions were very helpful and gave me confidence on busy roads.",
      date: "April 2026",
    },
    {
      name: "Harjot Singh",
      course: "Complete Driving Course",
      rating: 5,
      review:
        "Excellent experience from start to finish. The combination of theory and road practice prepared me very well for the driving test. Highly recommended.",
      date: "March 2026",
    },
    {
      name: "Jaspreet Kaur",
      course: "Complete Driving Course",
      rating: 5,
      review:
        "The flexible schedule made it easy to attend classes alongside my studies. The lessons were clear, practical, and focused on safe driving habits.",
      date: "February 2026",
    },
    {
      name: "Manpreet Singh",
      course: "Complete Driving Course",
      rating: 5,
      review:
        "Very professional training with plenty of road practice. The mock test sessions were especially useful and helped me feel fully prepared for the real exam.",
      date: "January 2026",
    },
    {
      name: "Navjot Kaur",
      course: "Complete Driving Course",
      rating: 5,
      review:
        "A great place for beginners. The lessons covered everything from basic vehicle control to traffic rules. I now feel confident driving independently.",
      date: "December 2025",
    },
  ];

  const scrollToReview = (index: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index] as HTMLElement | undefined;

    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveReview(index);
  };

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const index = Math.round(
      carousel.scrollLeft / carousel.clientWidth,
    );
    setActiveReview(Math.min(index, reviews.length - 1));
  };

  return (
    <section id="reviews" className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">
            What Our Students Say
          </h2>
          <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied students who achieved
            their driving goals with us
          </p>
        </div>

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, index) => (
            <div key={index} className="w-full flex-none snap-start">
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2 md:hidden">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              aria-label={`Show review ${index + 1}`}
              onClick={() => scrollToReview(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeReview === index
                  ? "w-7 bg-[#0071E3]"
                  : "w-2.5 bg-[rgba(0,0,0,0.18)]"
              }`}
            />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
