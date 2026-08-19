'use client';

import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import FloatingCube3D from '@/components/common/FloatingCube3D';
import { 
  Code2, 
  Server, 
  Cpu, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Brain, 
  Terminal, 
  Layers, 
  Rocket, 
  Database,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const chipsData = [
  { icon: Code2, label: 'Frontend' },
  { icon: Server, label: 'Backend' },
  { icon: Cpu, label: 'AI engineering' },
  { icon: GraduationCap, label: 'Telkom Purwokerto' },
];

// Row 1: 3 Cards
const row1Chips = [
  { icon: ShieldCheck, label: 'Clean & Scalable Code', tilt: 'rotate-[-1.5deg]' },
  { icon: Brain, label: 'Empathetic AI Integration', tilt: 'rotate-[2deg]', active: true },
  { icon: Zap, label: 'High Performance & UX', tilt: 'rotate-[-1deg]' },
];

// Row 2: 3 Cards
const row2Chips = [
  { icon: Database, label: 'REST API & Databases', tilt: 'rotate-[1.5deg]' },
  { icon: Layers, label: 'Responsive Architecture', tilt: 'rotate-[-2deg]' },
  { icon: Globe, label: 'Web Standards & Security', tilt: 'rotate-[1deg]' },
];

// Row 3: 2 Cards (Aligned with 3D Cube on the Right)
const row3Chips = [
  { icon: Terminal, label: 'System Automation', tilt: 'rotate-[-1deg]' },
  { icon: Rocket, label: 'Continuous Learning', tilt: 'rotate-[2deg]', activeBorder: true },
];

export default function AboutSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const maxTrack = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      setMaxScroll(maxTrack);
      setTranslateX(progress * Math.max(0, maxTrack));

      // Calculate active slide index (0 or 1)
      if (progress > 0.45) {
        setActiveSlide(1);
      } else {
        setActiveSlide(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick Jump to Slide 0 or Slide 1 with 100% pixel-perfect scroll alignment
  const scrollToSlide = (slideIndex) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

    const targetY = slideIndex === 0 
      ? containerTop + 10 
      : containerTop + totalScrollable - 10;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative h-[200vh] pt-12 md:pt-16" id="tentang">
      
      {/* Sticky Container - Transparent background to show global ambient glow */}
      <div className="sticky top-24 h-[calc(100vh-100px)] flex flex-col justify-between pt-2 pb-4 overflow-hidden bg-transparent z-20">
        
        {/* Dynamic Smooth Fade Gradients on Left and Right Edges (Active ONLY during horizontal scroll) */}
        <div 
          className={`absolute top-0 bottom-0 left-0 w-12 md:w-20 bg-gradient-to-r from-[var(--bg)]/80 to-transparent z-30 pointer-events-none transition-opacity duration-300 ${
            translateX > 15 ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        <div 
          className={`absolute top-0 bottom-0 right-0 w-12 md:w-20 bg-gradient-to-l from-[var(--bg)]/80 to-transparent z-30 pointer-events-none transition-opacity duration-300 ${
            maxScroll > 0 && translateX < maxScroll - 15 ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Top Header & Slide Indicator Navigation */}
        <div className="w-full shrink-0 z-30 pt-2 flex items-center justify-between">
          <div className="flex-1">
            <SectionHeader title="Tentang Saya" highlight="Saya" />
          </div>
        </div>

        {/* Horizontal Track Wrapper Aligned to Container Width */}
        <div className="w-full overflow-hidden relative z-20 my-auto">
          <div
            ref={trackRef}
            className="flex items-start gap-16 md:gap-24 will-change-transform transition-transform duration-150 ease-out pt-1"
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >

            {/* SLIDE 1: Profil & Filosofi (Matching Reference Image 1 Layout) */}
            <div className="w-full min-w-full shrink-0 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
                
                {/* Left Tall Photo Card */}
                <div className="md:col-span-4 flex flex-col">
                  <div className="h-full min-h-[360px] md:min-h-[380px] border border-[var(--line)] bg-[var(--card)] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-[var(--active)]/50 transition-all duration-300">
                    
                    {/* Real Profile Image */}
                    <img
                      src="/assets/profile.png"
                      alt="Aji Noto Sutrisno portrait"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />

                    {/* Dark gradient for premium legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 pointer-events-none" />
                    
                    {/* Spacer to push name to bottom */}
                    <div className="flex-1" />

                    {/* Bottom Amber Name Label */}
                    <div className="relative z-10 pt-2">
                      <span className="font-mono text-sm text-[var(--active)] font-semibold tracking-wide block">
                        Aji Noto Sutrisno
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--ink)] tracking-tight mb-5">
                      Interface. Logic. Intelligence.
                    </h3>
                    <div className="font-body text-[var(--muted)] text-base md:text-lg leading-[1.8] space-y-4">
                      <p>
                        Saya <strong className="text-[var(--ink)] font-semibold">Aji Noto Sutrisno</strong>, mahasiswa Informatika di Universitas Telkom Purwokerto yang fokus pada kecerdasan buatan dan pengembangan web. Bagi saya, teknologi terbaik lahir saat arsitektur yang terstruktur, antarmuka yang rapi, dan pengalaman pengguna yang matang bersatu.
                      </p>
                      <p>
                        Setiap hari, saya secara aktif merancang aplikasi web kontemporer, menguji arsitektur server, melatih model pembelajaran mesin, dan terus meneliti pendekatan baru untuk menghasilkan produk digital yang praktis.
                      </p>
                    </div>
                  </div>

                  {/* 2x2 Chip Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {chipsData.map((chip, idx) => {
                      const IconComponent = chip.icon;
                      return (
                        <div
                          key={idx}
                          className="border border-[var(--line)] bg-[var(--card)] rounded-2xl px-5 py-3.5 flex items-center gap-3 font-mono text-sm text-[var(--ink)] hover:border-[var(--active)]/60 hover:text-[var(--active)] transition-all duration-300 shadow-sm group"
                        >
                          <IconComponent size={18} className="text-[var(--active)] group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium tracking-wide">{chip.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* SLIDE 2: Standar & Prinsip (Spacious 3 / 3 / 2 + Cube Layout) */}
            <div className="w-full min-w-full shrink-0 flex flex-col">
              
              {/* Clean Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--ink)] tracking-tight mb-6 sm:mb-8">
                Kode Berstruktur, Performa, & Dampak Nyata.
              </h3>

              {/* Generous Spacious 3 / 3 / 2 + Cube Structured Layout */}
              <div className="w-full max-w-[1120px] flex flex-col gap-5 sm:gap-7 md:gap-8 pr-6 sm:pr-8">
                
                {/* ROW 1: 3 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
                  {row1Chips.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className={`border rounded-2xl px-5 sm:px-6 py-4 flex items-center gap-3.5 font-mono text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 ${item.tilt} ${
                          item.active 
                            ? 'border-[var(--active)]/70 bg-[var(--card)] shadow-[0_0_20px_rgba(232,163,61,0.2)]'
                            : 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--active)]'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                          <IconComponent size={17} className="text-[var(--active)]" />
                        </div>
                        <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 2: 3 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
                  {row2Chips.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className={`border border-[var(--line)] bg-[var(--card)] rounded-2xl px-5 sm:px-6 py-4 flex items-center gap-3.5 font-mono text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 hover:border-[var(--active)] ${item.tilt}`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                          <IconComponent size={17} className="text-[var(--active)]" />
                        </div>
                        <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 3: 2 Cards + Floating 3D Cube Aligned in 3rd Column */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-7 items-center pt-1">
                  
                  {/* Card 7 */}
                  <div className={`border border-[var(--line)] bg-[var(--card)] rounded-2xl px-5 sm:px-6 py-4 flex items-center gap-3.5 font-mono text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 hover:border-[var(--active)] ${row3Chips[0].tilt}`}>
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                      <Terminal size={17} className="text-[var(--active)]" />
                    </div>
                    <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                      {row3Chips[0].label}
                    </span>
                  </div>

                  {/* Card 8 */}
                  <div className={`border border-[var(--active)]/50 bg-[var(--card)] rounded-2xl px-5 sm:px-6 py-4 flex items-center gap-3.5 font-mono text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 hover:border-[var(--active)] ${row3Chips[1].tilt}`}>
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                      <Rocket size={17} className="text-[var(--active)]" />
                    </div>
                    <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                      {row3Chips[1].label}
                    </span>
                  </div>

                  {/* Slot for Global Tech Cube travel */}
                  <div className="hidden sm:flex justify-center sm:justify-start items-center pl-4 w-[135px] h-[135px]" />

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Bottom Slide Indicator Control Pills (Click to Snap 100% Pixel-Perfectly) */}
        <div className="w-full shrink-0 flex items-center justify-center gap-3 pt-2 z-30">
          <button
            onClick={() => scrollToSlide(0)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-300 flex items-center gap-2 border ${
              activeSlide === 0
                ? 'border-[var(--active)] bg-[var(--active)]/15 text-[var(--active)] font-semibold shadow-md'
                : 'border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-white/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeSlide === 0 ? 'bg-[var(--active)]' : 'bg-white/30'}`} />
            01 / Profil & Filosofi
          </button>

          <button
            onClick={() => scrollToSlide(1)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-300 flex items-center gap-2 border ${
              activeSlide === 1
                ? 'border-[var(--active)] bg-[var(--active)]/15 text-[var(--active)] font-semibold shadow-md'
                : 'border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-white/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeSlide === 1 ? 'bg-[var(--active)]' : 'bg-white/30'}`} />
            02 / Standar & Tools
          </button>
        </div>

      </div>
    </div>
  );
}
