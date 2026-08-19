'use client';

import React from 'react';

const METRICS = [
  'AVAILABLE FOR NEW PROJECTS',
  'HIGH PERFORMANCE WEB',
  'AI & MACHINE LEARNING INTEGRATED',
  'PURWOKERTO CENTRAL JAVA',
  'CLEAN CODE & SCALABLE ARCHITECTURE',
  'FULLSTACK & SYSTEM SPECIALIST',
];

export default function MetricTickerSection() {
  // Exactly 2 identical halves so 0% -> -50% loop point is 100% pixel-perfect & invisible
  const items = [...METRICS, ...METRICS];

  return (
    <div className="w-full py-4 md:py-6 overflow-hidden relative select-none">
      
      {/* Left/Right Smooth Fade Masks with multi-stops at screen edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/70 to-transparent z-10 pointer-events-none" />

      {/* Hardware Accelerated Infinite Marquee Track */}
      <div className="flex whitespace-nowrap animate-marquee w-max shrink-0">
        {items.map((text, index) => (
          <div
            key={index}
            className="flex items-center gap-6 md:gap-10 px-4 md:px-6 font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase shrink-0"
          >
            <span className="text-[var(--ink)] opacity-90 hover:text-[var(--active)] transition-colors duration-300">
              {text}
            </span>
            <span className="text-[var(--active)] opacity-60 text-lg sm:text-xl font-normal">
              —
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
