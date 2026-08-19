'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const fullText = "Welcome to my portfolio";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);

        // Pause after typing complete, then trigger fade out
        setTimeout(() => {
          setIsFadingOut(true);
          // Allow scrolling again and reset scroll position to top
          document.body.style.overflow = '';
          if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
          }
          
          // Remove from DOM after fade animation completes
          setTimeout(() => {
            setIsHidden(true);
          }, 700);
        }, 600);
      }
    }, 55);

    return () => {
      clearInterval(typingInterval);
      document.body.style.overflow = '';
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B0806] flex flex-col items-center justify-center px-6 transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Decorative background glow */}
      <div className="absolute w-[300px] h-[300px] bg-[var(--active)]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Terminal / Code style container */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Subtitle tag */}
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4 animate-pulse">
          ● Initializing System
        </span>

        {/* Typewriter H1 */}
        <h1 className="font-mono text-2xl sm:text-4xl font-bold tracking-tight text-[#F5EFE6] flex items-center gap-1 min-h-[48px]">
          <span>{displayedText}</span>
          <span className="inline-block w-2.5 h-7 sm:h-9 bg-[var(--active)] animate-pulse" />
        </h1>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-1 bg-[var(--line)] rounded-full overflow-hidden mt-8">
          <div
            className="h-full bg-[var(--active)] transition-all duration-150 ease-out"
            style={{
              width: `${(displayedText.length / fullText.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
