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
  const containerRef  = useRef(null);
  const trackRef      = useRef(null);
  const dot0Ref       = useRef(null);
  const dot1Ref       = useRef(null);

  // Raw refs — no state, no re-renders on every scroll frame
  const translateXRef = useRef(0);
  const maxScrollRef  = useRef(0);
  const activeSlideRef = useRef(0);

  // Expose stable values for scrollToSlide (button clicks)
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!containerRef.current || !trackRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) { ticking = false; return; }

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const maxTrack = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      maxScrollRef.current = maxTrack;
      const tx = progress * Math.max(0, maxTrack);
      translateXRef.current = tx;

      // ── Direct DOM mutations — zero React overhead ──
      trackRef.current.style.transform = `translate3d(-${tx}px, 0, 0)`;

      const newSlide = progress > 0.45 ? 1 : 0;
      if (newSlide !== activeSlideRef.current) {
        activeSlideRef.current = newSlide;
        setActiveSlide(newSlide);          // only fires when slide index truly changes
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
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
      
      {/* Sticky Container */}
      <div className="sticky top-24 h-[calc(100vh-100px)] flex flex-col justify-between pt-2 pb-4 overflow-hidden bg-transparent z-20">
        
        {/* Top Header & Slide Indicator Navigation */}
        <div className="w-full shrink-0 z-30 pt-2 flex items-center justify-between">
          <div className="flex-1">
            <SectionHeader title="Tentang Saya" highlight="Saya" />
          </div>
        </div>

        {/* Horizontal Track — gap-0 so maxScroll = exactly one slide width */}
        <div className="w-full overflow-hidden relative z-20 my-auto">
          <div
            ref={trackRef}
            className="flex items-start gap-0 will-change-transform pt-1"
            style={{ transform: 'translate3d(0px, 0, 0)' }}
          >

            {/* SLIDE 1: Profil & Filosofi */}
            <div className="w-full min-w-full shrink-0 flex flex-col pr-12 md:pr-16">
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

            {/* SLIDE 2: Standar & Prinsip */}
            <div className="w-full min-w-full shrink-0 flex flex-col pl-12 md:pl-16">
              
              {/* Clean Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--ink)] tracking-tight mb-6 sm:mb-8">
                Kode Berstruktur, Performa, & Dampak Nyata.
              </h3>

              {/* Generous Spacious Card Grid Layout */}
              <div className="w-full flex flex-col gap-4 sm:gap-6">
                
                {/* ROW 1: 2 cols on mobile, 3 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
                  {row1Chips.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className={`border rounded-2xl px-3 sm:px-5 py-3.5 flex items-center gap-2.5 sm:gap-3.5 font-mono text-xs sm:text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 ${item.tilt} ${
                          item.active 
                            ? 'border-[var(--active)]/70 bg-[var(--card)] shadow-[0_0_20px_rgba(232,163,61,0.2)]'
                            : 'border-[var(--line)] bg-[var(--card)] hover:border-[var(--active)]'
                        }`}
                      >
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                          <IconComponent size={15} className="text-[var(--active)]" />
                        </div>
                        <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 2: 2 cols on mobile, 3 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
                  {row2Chips.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className={`border border-[var(--line)] bg-[var(--card)] rounded-2xl px-3 sm:px-5 py-3.5 flex items-center gap-2.5 sm:gap-3.5 font-mono text-xs sm:text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 hover:border-[var(--active)] ${item.tilt}`}
                      >
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                          <IconComponent size={15} className="text-[var(--active)]" />
                        </div>
                        <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 3: 2 Cards + Cube slot */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 items-center">
                  
                  {/* Card 7 */}
                  <div className={`border border-[var(--line)] bg-[var(--card)] rounded-2xl px-3 sm:px-5 py-3.5 flex items-center gap-2.5 sm:gap-3.5 font-mono text-xs sm:text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 hover:border-[var(--active)] ${row3Chips[0].tilt}`}>
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                      <Terminal size={15} className="text-[var(--active)]" />
                    </div>
                    <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                      {row3Chips[0].label}
                    </span>
                  </div>

                  {/* Card 8 */}
                  <div className={`border border-[var(--active)]/50 bg-[var(--card)] rounded-2xl px-3 sm:px-5 py-3.5 flex items-center gap-2.5 sm:gap-3.5 font-mono text-xs sm:text-sm transition-all duration-300 shadow-lg cursor-pointer group hover:rotate-0 hover:scale-105 hover:border-[var(--active)] ${row3Chips[1].tilt}`}>
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 group-hover:border-[var(--active)] transition-colors">
                      <Rocket size={15} className="text-[var(--active)]" />
                    </div>
                    <span className="font-medium tracking-wide leading-snug text-[var(--ink)] group-hover:text-[var(--active)] transition-colors">
                      {row3Chips[1].label}
                    </span>
                  </div>

                  {/* Cube slot */}
                  <div className="hidden md:flex justify-center items-center w-[135px] h-[135px]" />

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
