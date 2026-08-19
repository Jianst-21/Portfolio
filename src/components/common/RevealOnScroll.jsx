'use client';
import { useEffect, useRef } from 'react';

// Uses direct DOM class toggle instead of React state to avoid re-renders.
// The element starts invisible via CSS and transitions in when observed.
export default function RevealOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay via inline style, then trigger animation class
          el.style.animationDelay = `${delay}ms`;
          el.classList.add('animate-fade-up', 'opacity-100');
          el.classList.remove('opacity-0');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} opacity-0`}
    >
      {children}
    </div>
  );
}
