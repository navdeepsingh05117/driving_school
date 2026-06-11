import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import AnimatedSvg from "./AnimatedSvg";
import InstructorCard from "./InstructorCard";
import teacherStudentIllustration from "../../imports/illustrations/teacher-student-not-css.svg?raw";
import {
  Clock,
  Car,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

type Instructor = {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  languages: string[];
  certifications: string[];
  portraitTone: string;
};

function MobileInstructorCarousel({ instructors }: { instructors: Instructor[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    handleSelect();
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div className="md:hidden">
      <div className="-mx-4 overflow-hidden pl-4" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 pb-3 pr-4">
          {instructors.map((instructor, index) => {
            const isActive = index === activeIndex;
            const initials = instructor.name
              .trim()
              .split(/\s+/)
              .map((part) => part[0])
              .join("");

            return (
              <motion.article
                key={instructor.name}
                className="h-[456px] min-w-0 flex-[0_0_82%] transform-gpu overflow-hidden rounded-[24px] border border-[#E1EAF5] bg-white shadow-[0_18px_44px_rgba(20,38,61,0.10)] min-[390px]:h-[468px]"
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.72,
                  y: isActive ? 0 : 8,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 24, mass: 0.7 }}
                style={{
                  boxShadow: isActive
                    ? "0 26px 68px rgba(0, 83, 166, 0.18), 0 10px 24px rgba(20, 38, 61, 0.08)"
                    : "0 14px 34px rgba(20, 38, 61, 0.08)",
                  willChange: "transform, opacity",
                }}
              >
                <div className={`relative h-[172px] overflow-hidden min-[390px]:h-[178px] ${instructor.portraitTone}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.86),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.15),rgba(0,0,0,0.16))]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold text-[#1D1D1F] shadow-sm backdrop-blur">
                    {instructor.experience}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex justify-center">
                    <div className="flex h-32 w-32 translate-y-6 items-center justify-center rounded-full border-[10px] border-white/55 bg-gradient-to-br from-white/90 to-white/35 text-4xl font-semibold text-white shadow-[0_24px_50px_rgba(15,40,75,0.20)] backdrop-blur">
                      <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.20)]">{initials}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0071E3]">
                    Certified Instructor
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#1D1D1F]">
                    {instructor.name.trim()}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-6 text-[#657080]">
                    {instructor.specialty}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <div className="rounded-2xl border border-[#E7EEF8] bg-[#F8FBFF] px-3 py-3">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#8A95A3]">
                        Experience
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#1D1D1F]">
                        {instructor.experience.replace(" experience", "")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#E7EEF8] bg-[#F8FBFF] px-3 py-3">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#8A95A3]">
                        Languages
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#1D1D1F]">
                        {instructor.languages.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {instructor.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="rounded-full border border-[#DCEAF8] bg-white px-3 py-1.5 text-xs font-semibold text-[#526170]"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2" aria-label="Instructor carousel progress">
        {instructors.map((instructor, index) => (
          <button
            key={`${instructor.name}-indicator`}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-7 bg-[#0071E3]" : "w-2 bg-[#C8D8EA]"
            }`}
            aria-label={`Show ${instructor.name.trim()}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default function Instructors() {
  const instructors = [
    {
      name: "Parwinder Singh ",
      specialty: "Beginner & Nervous Drivers",
      experience: "12 years experience",
      rating: 5,
      languages: ["Punjabi", "Hindi"],
      portraitTone: "bg-gradient-to-br from-[#006FDB] via-[#5EA9F4] to-[#EAF5FF]",
      certifications: [
        "ADI Certified",
        "Fleet Trainer",
        "Pass Plus",
      ],
    },
    {
      name: "Varinder Singh",
      specialty: "Intensive Courses",
      experience: "12 years experience",
      rating: 5,
      languages: ["Punjabi", "Hindi"],
      portraitTone: "bg-gradient-to-br from-[#0A4D8F] via-[#48A1E8] to-[#DCEEFF]",
      certifications: ["ADI Certified", "Advanced Driving"],
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Patient and friendly training",
    },
    {
      icon: Award,
      title: "Beginner-friendly guidance",
    },
    {
      icon: BookOpen,
      title: "Road practice and test preparation",
    },
    {
      icon: Clock,
      title: "Flexible lesson timing",
    },
    {
      icon: Car,
      title: "Safe and modern training cars",
    },
  ];

  return (
    <section
      id="instructors"
      className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:py-24 bg-gradient-to-b from-[#F5F5F7] to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">
            Meet Our Instructors
          </h2>
          <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Learn from experienced, patient, and certified
            professionals dedicated to your success
          </p>
        </div>

        <MobileInstructorCarousel instructors={instructors} />

        <div className="hidden items-center gap-8 sm:gap-10 md:grid lg:gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="flex justify-center lg:justify-start">
            <AnimatedSvg
              svg={teacherStudentIllustration}
              label="Teacher and student illustration"
              className="w-full max-w-[18rem] sm:max-w-sm lg:max-w-md [&_svg]:h-auto [&_svg]:max-h-[260px] sm:[&_svg]:max-h-[360px] lg:[&_svg]:max-h-[420px] [&_svg]:w-full"
            />
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {instructors.map((instructor, index) => (
                <InstructorCard key={index} {...instructor} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
              {benefits.slice(0, 4).map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white/70 px-4 py-3"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 text-[#0071E3]" />
                  <span className="text-sm font-medium text-[#1D1D1F]">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
