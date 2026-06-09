import { useEffect, useMemo, useRef } from 'react';

interface AnimatedSvgProps {
  svg: string;
  label: string;
  className?: string;
}

export default function AnimatedSvg({ svg, label, className }: AnimatedSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWithoutAnimatedClass = useMemo(
    () => svg.replace(/\sclass="([^"]*\s)?animated(\s[^"]*)?"/, (_, before = '', after = '') => {
      const classes = `${before}${after}`.trim();
      return classes ? ` class="${classes}"` : '';
    }),
    [svg],
  );

  useEffect(() => {
    const container = containerRef.current;
    const animatedSvg = container?.querySelector('svg');

    if (!container || !animatedSvg) {
      return;
    }

    const playAnimation = () => {
      animatedSvg.classList.remove('animated');
      void animatedSvg.getBoundingClientRect();
      animatedSvg.classList.add('animated');
    };

    if (!('IntersectionObserver' in window)) {
      playAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playAnimation();
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.25,
      },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [svgWithoutAnimatedClass]);

  return (
    <div
      ref={containerRef}
      aria-label={label}
      role="img"
      className={className}
      dangerouslySetInnerHTML={{ __html: svgWithoutAnimatedClass }}
    />
  );
}
