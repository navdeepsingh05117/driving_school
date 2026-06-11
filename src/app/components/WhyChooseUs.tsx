import { useRef, useState } from 'react';
import { Shield, Clock, Award, HeartHandshake, Car, BookOpen } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

type Feature = {
  icon: typeof Shield;
  title: string;
  description: string;
  points: string[];
};

function StoryCard({
  feature,
  index,
  storyIndex,
  activeIndex,
  total,
}: {
  feature: Feature;
  index: number;
  storyIndex: MotionValue<number>;
  activeIndex: number;
  total: number;
}) {
  const Icon = feature.icon;
  const isActive = index === activeIndex;
  const y = useTransform(storyIndex, (latest) => {
    const offset = index - latest;
    return offset < 0 ? offset * 46 : offset * 88;
  });
  const scale = useTransform(storyIndex, (latest) => {
    const distance = Math.abs(index - latest);
    return Math.max(0.94, 1 - Math.min(distance, 1) * 0.05);
  });
  const cardOpacity = useTransform(storyIndex, (latest) => {
    const distance = Math.abs(index - latest);
    return distance > 1.35 ? 0 : 1;
  });
  const contentOpacity = useTransform(storyIndex, (latest) => {
    const distance = Math.abs(index - latest);
    return Math.max(0.28, 1 - Math.min(distance, 1) * 0.72);
  });
  const blur = useTransform(storyIndex, (latest) => {
    const distance = Math.abs(index - latest);
    return `blur(${Math.min(distance, 1) * 1.4}px)`;
  });
  const cardShadow = useTransform(storyIndex, (latest) => {
    const focus = Math.max(0, 1 - Math.min(Math.abs(index - latest), 1));
    const blueAlpha = 0.08 + focus * 0.12;
    const darkAlpha = 0.08 + focus * 0.05;

    return `0 ${18 + focus * 24}px ${40 + focus * 56}px rgba(0, 83, 166, ${blueAlpha}), 0 ${8 + focus * 10}px ${22 + focus * 20}px rgba(20, 38, 61, ${darkAlpha})`;
  });
  const zIndex = useTransform(storyIndex, (latest) => Math.round((total - Math.abs(index - latest)) * 10));

  return (
    <motion.article
      className="absolute inset-x-0 top-0 mx-auto transform-gpu overflow-hidden rounded-[24px] border border-[#E4EDF7] bg-white p-6 text-left min-[390px]:p-7"
      style={{
        y,
        scale,
        opacity: cardOpacity,
        filter: blur,
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none',
        boxShadow: cardShadow,
        willChange: 'transform, opacity, filter',
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-white" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#A7D3FF] to-transparent" />
      <motion.div className="relative" style={{ opacity: contentOpacity }}>
      <div className="mb-5 flex items-start justify-between gap-4 min-[390px]:mb-6">
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#E9F4FF] via-white to-[#DDF0FF] text-[#0071E3] shadow-[inset_0_0_0_1px_rgba(0,113,227,0.10),0_18px_38px_rgba(0,113,227,0.15)] min-[390px]:h-[76px] min-[390px]:w-[76px] min-[390px]:rounded-[24px]">
          <Icon className="h-8 w-8 min-[390px]:h-9 min-[390px]:w-9" />
        </div>
        <span className="mt-1 rounded-full border border-[#DCEAF8] bg-[#F6FAFF] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#0071E3]">
          10k+ learners
        </span>
      </div>
      <h3 className="text-[1.5rem] font-semibold leading-[1.1] text-[#1D1D1F] min-[390px]:text-[1.65rem]">
        {feature.title}
      </h3>
      <p className="mt-3 text-[0.96rem] leading-[1.65] text-[#5F6673] min-[390px]:mt-3.5 min-[390px]:text-[1rem]">
        {feature.description}
      </p>
      <ul className="mt-5 space-y-2.5 min-[390px]:mt-6 min-[390px]:space-y-3.5">
        {feature.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm font-semibold text-[#263241]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF7FF]">
              <span className="h-2 w-2 rounded-full bg-[#0071E3] shadow-[0_0_0_4px_rgba(0,113,227,0.10)]" />
            </span>
            {point}
          </li>
        ))}
      </ul>
      </motion.div>
    </motion.article>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      icon: Shield,
      title: 'Certified Instructors',
      description: 'All our instructors are government-certified with years of teaching experience.',
      points: ['Licensed trainers', 'Calm road coaching', 'Safety-first habits'],
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose lesson times that fit your busy lifestyle, including evenings and weekends.',
      points: ['Morning to evening slots', 'Weekend availability', 'Easy rescheduling'],
    },
    {
      icon: Award,
      title: 'High Pass Rate',
      description: 'Our students achieve a 98% first-time pass rate thanks to quality training.',
      points: ['Test-focused practice', 'Clear progress checks', 'Confidence building'],
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Learning',
      description: 'Custom lesson plans tailored to your skill level and learning pace.',
      points: ['Beginner friendly', 'Pace matched to you', 'One-to-one guidance'],
    },
    {
      icon: Car,
      title: 'Modern Fleet',
      description: 'Learn in well-maintained, modern vehicles equipped with dual controls.',
      points: ['Dual-control cars', 'Clean interiors', 'Road-ready comfort'],
    },
    {
      icon: BookOpen,
      title: 'Theory Support',
      description: 'Free access to our online theory practice platform and study materials.',
      points: ['Rules made simple', 'Practice material', 'Road sign revision'],
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 26,
    mass: 0.55,
    restDelta: 0.001,
  });
  const storyIndex = useTransform(smoothProgress, [0, 1], [0, features.length - 1]);
  const progressFill = useTransform(storyIndex, (latest) => Math.min((latest + 1) / features.length, 1));

  useMotionValueEvent(storyIndex, 'change', (latest) => {
    const nextIndex = Math.min(Math.max(Math.round(latest), 0), features.length - 1);
    setActiveIndex(nextIndex);
  });

  return (
    <section className="scroll-mt-20 bg-white md:bg-gradient-to-b md:from-white md:to-[#F5F5F7]">
      <div
        ref={sectionRef}
        className="relative md:hidden"
        style={{ height: `${features.length * 92}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-4 py-4">
          <div className="mx-auto w-full max-w-[390px] pt-2 text-center">
            <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0071E3]">
              Built for safe confidence
            </p>
            <h2 className="mx-auto max-w-[350px] text-[1.75rem] font-semibold leading-[1.08] text-[#1D1D1F] min-[390px]:text-[1.92rem]">
              Why Choose Saini Driving School
            </h2>
            <p className="mx-auto mt-2 max-w-[330px] text-[0.93rem] leading-6 text-[#6E6E73] min-[390px]:mt-2.5 min-[390px]:text-[0.95rem]">
              Discover each part of our driver education experience, one benefit at a time.
            </p>
          </div>

          <div className="mx-auto mt-4 flex w-full max-w-[360px] items-center gap-3 rounded-full border border-[#E1ECF8] bg-white px-3 py-2 shadow-[0_12px_34px_rgba(20,38,61,0.07)]">
            <span className="min-w-12 text-sm font-bold tabular-nums text-[#0071E3]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#DCE7F5]">
              <motion.div
                className="h-full rounded-full bg-[#0071E3]"
                style={{
                  scaleX: progressFill,
                  transformOrigin: 'left',
                }}
              />
            </div>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {features.map((feature, index) => (
                <span
                  key={`${feature.title}-dot`}
                  className={`h-1.5 rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
                    index === activeIndex ? 'w-5 bg-[#0071E3]' : index < activeIndex ? 'w-1.5 bg-[#6EAFF3]' : 'w-1.5 bg-[#C8D8EA]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-11 flex min-h-0 w-full max-w-[390px] flex-1 items-start justify-center pb-4">
            {features.map((feature, index) => (
              <StoryCard
                key={feature.title}
                feature={feature}
                index={index}
                storyIndex={storyIndex}
                activeIndex={activeIndex}
                total={features.length}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden px-4 py-12 sm:px-6 sm:py-16 md:block lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-9 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 sm:mb-4">Why Choose Saini Driving School</h2>
            <p className="text-base sm:text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive approach to driver education
            </p>
          </div>

          <div className="grid grid-cols-1 min-[430px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group h-full min-h-[188px] rounded-3xl border border-[#E4ECF5] bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-[#CFE4FA] hover:shadow-[0_22px_55px_rgba(0,47,108,0.10)] sm:p-6 lg:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0071E3] transition-all group-hover:bg-[#0071E3] group-hover:text-white lg:mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1D1D1F] mb-2 lg:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
