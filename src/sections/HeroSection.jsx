'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import MetricTickerSection from '@/sections/MetricTickerSection';

function GithubIcon({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const ROLES = [
  'Web Developer',
  'Informatics Student',
  'Fullstack Developer',
  'Project Manager',
  'Frontend Developer',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = ROLES[roleIndex];
    let timer;

    if (!isDeleting) {
      if (currentText !== targetText) {
        timer = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, 100);
      } else {
        // Pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      if (currentText !== '') {
        timer = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length - 1));
        }, 40);
      } else {
        // Move to next word when empty
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-4 pb-2 overflow-x-clip">
      
      {/* Hero Content Grid (Centered in Viewport) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-4">
        
        {/* Left Column: Copy, Socials & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left z-10">
          
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-3 font-medium">
            HALO, SAYA
          </span>

          {/* Main Name Heading */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-tight mb-5">
            Aji Noto Sutrisno
          </h1>

          {/* Role Subtitle with Typewriter Animation */}
          <div className="mb-5 min-h-[60px] flex flex-col items-center lg:items-start">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
              Seorang
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] relative inline-block">
              <span className="text-[var(--active)]">{currentText}</span>
              <span className="inline-block w-0.5 h-6 bg-[var(--active)] ml-1 animate-pulse align-middle" />
              <span className="block h-1 w-full bg-[var(--active)] mt-1.5 rounded-full transition-all duration-300" />
            </h2>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 text-[var(--muted)]">
            <a href="https://github.com/Jianst-21" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors p-1" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/aji-noto-sutrisno-180946421/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors p-1" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://www.instagram.com/jiinst_/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors p-1" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="mailto:ajinotosutrisno212@gmail.com" className="hover:text-[var(--ink)] transition-colors p-1" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://wa.me/6285604458507" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)] transition-colors p-1" aria-label="WhatsApp">
              <Phone size={20} />
            </a>
          </div>

          {/* Description Paragraph */}
          <p className="font-body text-base sm:text-lg text-[var(--muted)] max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0">
            Saya membantu bisnis dan individu mengubah ide menjadi solusi digital yang indah, cerdas, dan berfungsi sempurna.
          </p>

          {/* CTA Pill Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(232,163,61,0.3)]"
              style={{ backgroundColor: 'var(--active)', color: 'var(--bg)' }}
            >
              Lihat Proyek
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-body font-medium text-sm border border-[var(--line)] text-[var(--ink)] bg-[var(--card)] hover:border-[var(--muted)] hover:bg-[var(--line)]/50 transition-all duration-200"
            >
              Kontak Saya
            </a>
          </div>
        </div>

        {/* Right Column: Full Image Card Container with Glossy Overlay */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10 w-full">
          <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[32px] border border-[var(--line)] bg-[var(--card)] shadow-2xl overflow-hidden group hover:border-[var(--active)]/40 transition-all duration-500">
            
            {/* Image / Portrait Container */}
            <div className="relative w-full h-full bg-[#110d0a] flex flex-col justify-between p-6 overflow-hidden">
              
              {/* Profile Portrait Image */}
              <img
                src="/assets/profile.png"
                alt="Aji Noto Sutrisno portrait"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

              {/* Glossy Top Badge Overlay */}
              <div className="relative z-10 backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-3.5 w-fit max-w-[85%] shadow-lg">
                <h3 className="font-display text-lg font-bold text-white tracking-tight leading-tight">
                  Aji Noto Sutrisno
                </h3>
                <p className="font-mono text-xs text-amber-200/80 mt-1 font-medium min-h-[16px]">
                  {currentText || "Software Engineer"}
                </p>
              </div>

              {/* Spacer container to maintain grid spacing */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4" />

              {/* Glossy Bottom Profile Bar */}
              <div className="relative z-10 backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-semibold text-white">
                      @Jianst-21
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 font-medium">
                      Online
                    </span>
                  </div>
                </div>

                <a
                  href="#kontak"
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[var(--active)] hover:text-[var(--bg)] font-mono text-xs text-white border border-white/15 transition-all font-medium backdrop-blur-sm"
                >
                  Contact Me
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Metric Ticker Section Pinned Right at Bottom Edge of Screen 1 */}
      <div className="-mx-6 sm:-mx-8 shrink-0 pt-2 pb-1 overflow-hidden">
        <MetricTickerSection />
      </div>

    </section>
  );
}
