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

export default function Instructors() {
  const instructors = [
    {
      name: "Parinder Singh ",
      specialty: "Beginner & Nervous Drivers",
      experience: "12 years experience",
      rating: 5,
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
      certifications: ["ADI Certified", "Advanced Driving"],
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Patient and friendly training",
      description:
        "Our instructors create a comfortable learning environment",
    },
    {
      icon: Award,
      title: "Beginner-friendly guidance",
      description:
        "Step-by-step instruction designed for new drivers",
    },
    {
      icon: BookOpen,
      title: "Road practice and test preparation",
      description:
        "Comprehensive training for real-world driving",
    },
    {
      icon: Clock,
      title: "Flexible lesson timing",
      description:
        "Schedule lessons that fit your busy lifestyle",
    },
    {
      icon: Car,
      title: "Safe and modern training cars",
      description:
        "Well-maintained vehicles with dual controls",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="instructors"
      className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F5F5F7] to-white"
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

        <div className="grid items-center gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex justify-center">
            <AnimatedSvg
              svg={teacherStudentIllustration}
              label="Teacher and student illustration"
              className="w-full max-w-[22rem] sm:max-w-xl [&_svg]:h-auto [&_svg]:max-h-[360px] sm:[&_svg]:max-h-[500px] [&_svg]:w-full"
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
