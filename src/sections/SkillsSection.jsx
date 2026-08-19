'use client';

import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import InteractiveTechStage3D from '@/components/common/InteractiveTechStage3D';
import { Sparkles, Code2, Server, Cpu, Layers, Terminal, Globe, CheckCircle2, ShieldCheck, ChevronDown } from 'lucide-react';

const TECH_ECOSYSTEM = [
  {
    id: 'react',
    name: 'React.js',
    color: '#61DAFB',
    category: 'Frontend Ecosystem',
    icon: Code2,
    svgPath: '/assets/icons/react.svg',
    tagline: 'High-Performance UI Component Architecture',
    desc: 'Membangun antarmuka pengguna web kontemporer dengan modul komponen terstruktur, state management responsif, dan alur data yang efisien.',
    capabilities: ['Component Modularization', 'React Hooks & State Flow', 'SPA & Virtual DOM Optimization'],
    rightTitle: 'Frontend Performance & UX',
    rightDesc: 'Fokus pada render yang cepat, struktur komponen modular, serta aksesibilitas antarmuka pengguna yang matang.'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    color: '#339933',
    category: 'Backend & Server Runtime',
    icon: Server,
    svgPath: '/assets/icons/nodejs.svg',
    tagline: 'Scalable ExpressJS & Database Infrastructure',
    desc: 'Merancang RESTful API cepat menggunakan runtime Node.js, middleware ExpressJS, serta integrasi database MySQL dan backend cloud Supabase.',
    capabilities: ['ExpressJS Middleware', 'MySQL & Supabase Databases', 'RESTful API Architecture'],
    rightTitle: 'Server Architecture & APIs',
    rightDesc: 'Mengoptimalkan throughput server, pengolahan query database instan, serta arsitektur backend scalable.'
  },
  {
    id: 'python',
    name: 'Python & AI',
    color: '#0277BD',
    category: 'AI & Data Science',
    icon: Cpu,
    svgPath: '/assets/icons/python.svg',
    tagline: 'Computer Vision & Machine Learning Models',
    desc: 'Melatih model Machine Learning dan Computer Vision (YOLO, IndoBERT, SVM) untuk pemrosesan gambar, teks, dan otomasi pipeline data.',
    capabilities: ['YOLO (Computer Vision)', 'IndoBERT (NLP Models)', 'Supervised Learning (SVM)'],
    rightTitle: 'Artificial Intelligence Core',
    rightDesc: 'Mengintegrasikan kecerdasan buatan ke aplikasi web untuk otomasi dan pemecahan masalah praktis.'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    color: '#FFFFFF',
    category: 'Fullstack Framework',
    icon: Layers,
    svgPath: '/assets/icons/nextjs.svg',
    tagline: 'Enterprise Production Ready Web Architecture',
    desc: 'Membangun web app skala produksi dengan Next.js, memanfaatkan Server Components, Server Actions, dan integrasi mulus dengan database cloud Supabase.',
    capabilities: ['App Router Architecture', 'Server Actions & SSR', 'Supabase Integration'],
    rightTitle: 'Fullstack Web Systems',
    rightDesc: 'Perpaduan ekosistem frontend dan backend terintegrasi dengan pemuatan halaman instan.'
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    color: '#38BDF8',
    category: 'Design System & Styling',
    icon: Globe,
    svgPath: '/assets/icons/tailwind.svg',
    tagline: 'Figma-to-Code Utility Responsive Styling',
    desc: 'Mengimplementasikan desain antarmuka responsif dari Figma secara presisi dengan utility classes CSS dan token tema kustom.',
    capabilities: ['Figma-to-Code Precision', 'Utility-First Styling System', 'Responsive Grid & Flexbox'],
    rightTitle: 'Design System & Aesthetics',
    rightDesc: 'Tipografi modern, aksen warna harmonis, serta mikro-interaksi antarmuka yang memukau.'
  },
  {
    id: 'javascript',
    name: 'JavaScript & ES6+',
    color: '#F7DF1E',
    category: 'Core Programming Language',
    icon: Terminal,
    svgPath: '/assets/icons/javascript.svg',
    tagline: 'Dynamic Asynchronous Web Programming Logic',
    desc: 'Bahasa inti pemrograman web modern yang dikombinasikan dengan HTML/CSS untuk membangun logika interaktif dinamis dan manipulasi DOM.',
    capabilities: ['ES6+ Modern Syntax', 'Asynchronous Async/Await', 'DOM Manipulation & Logic'],
    rightTitle: 'Core Engine & Logic',
    rightDesc: 'Fondasi utama pemrograman web modern dengan eksekusi event-driven yang responsif.'
  },
];

// Intro bounds: first 10% scroll, Outro bounds: last 10% scroll
const INTRO_BOUND = 0.10;
const OUTRO_BOUND = 0.90;

export default function SkillsSection() {
  const containerRef = useRef(null);
  const [isIdle, setIsIdle] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isIdleRef = useRef(true);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!containerRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const INTRO_BOUND = 0.08;
      const OUTRO_BOUND = 0.92;

      const scrollableDistance = rect.height - window.innerHeight;
      const scrolledInto = -rect.top;

      let progress = 0;
      if (scrolledInto > 0 && scrollableDistance > 0) {
        progress = Math.min(1, Math.max(0, scrolledInto / scrollableDistance));
      }

      let nextIdle = isIdleRef.current;
      let nextIndex = activeIndexRef.current;

      if (progress < INTRO_BOUND) {
        nextIdle = true;
        nextIndex = 0;
      } else if (progress >= OUTRO_BOUND) {
        nextIdle = true;
        nextIndex = TECH_ECOSYSTEM.length - 1;
      } else {
        nextIdle = false;
        const techProgress = (progress - INTRO_BOUND) / (OUTRO_BOUND - INTRO_BOUND);
        nextIndex = Math.min(
          TECH_ECOSYSTEM.length - 1,
          Math.max(0, Math.floor(techProgress * TECH_ECOSYSTEM.length))
        );
      }

      if (nextIdle !== isIdleRef.current) {
        isIdleRef.current = nextIdle;
        setIsIdle(nextIdle);
      }

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
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

  const activeTech = TECH_ECOSYSTEM[activeIndex];

  return (
    <div ref={containerRef} className="relative h-[300vh] pt-6 md:pt-16" id="kemampuan">

      {/* Sticky Viewport Container */}
      <div className="sticky top-14 lg:top-24 h-[calc(100vh-60px)] lg:h-[calc(100vh-100px)] flex flex-col justify-between pt-1 pb-2 lg:pt-2 lg:pb-6 overflow-hidden bg-transparent z-20">

        {/* Dynamic Radial Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 z-0"
          style={{
            opacity: isIdle ? 0.08 : 0.25,
            background: isIdle
              ? 'radial-gradient(circle at 50% 50%, rgba(148,163,184,0.08) 0%, transparent 65%)'
              : `radial-gradient(circle at 50% 50%, ${activeTech.color}20 0%, ${activeTech.color}05 50%, transparent 72%)`
          }}
        />

        {/* Section Header */}
        <div className="w-full shrink-0 z-30 pt-1 relative">
          <SectionHeader title="Ekosistem & Kemampuan" highlight="Kemampuan" />
        </div>

        {/* 3-Column Grid Layout */}
        <div className="w-full max-w-[1120px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center px-2 sm:px-4 relative z-10">

          {/* ── LEFT PANEL ──────────────────────────────────────────────────────── */}
          <div
            className="hidden lg:flex lg:col-span-4 flex-col space-y-4 transition-all duration-700"
            style={{
              opacity: isIdle ? 0.02 : 1,
              pointerEvents: isIdle ? 'none' : 'auto',
              transform: isIdle ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            <div
              className="border rounded-2xl p-6 bg-gradient-to-b from-[var(--card)]/70 to-[var(--card)]/30 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-[350px] transition-colors duration-500"
              style={{ borderColor: `${activeTech.color}22` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-medium flex items-center gap-1.5 transition-colors duration-500"
                  style={{ color: activeTech.color, borderColor: `${activeTech.color}28`, backgroundColor: `${activeTech.color}0a` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeTech.color }} />
                  {activeTech.category}
                </span>
                <span className="font-mono text-[11px] text-[var(--muted)]">
                  0{activeIndex + 1} / 0{TECH_ECOSYSTEM.length}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold tracking-tight mb-2 text-[var(--ink)] transition-colors duration-500">
                {activeTech.name}
              </h3>

              <p className="font-body text-[var(--muted)] text-sm leading-relaxed mb-4">
                {activeTech.desc}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/5">
                {activeTech.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2.5 font-mono text-xs text-[var(--muted)]">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: activeTech.color }} />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CENTER STAGE ─────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[200px] lg:min-h-[340px] w-full">

            {/* Intro overlay label (Hanya terlihat saat intro/outro mode, tidak menimpa kubus) */}
            <div
              className="flex flex-col items-center gap-1.5 mb-2 transition-all duration-700 pointer-events-none select-none overflow-hidden"
              style={{
                opacity: isIdle ? 1 : 0,
                maxHeight: isIdle ? 140 : 0,
                marginBottom: isIdle ? 8 : 0,
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Full Stack Ecosystem
              </span>
              <div className="flex flex-wrap justify-center gap-1 max-w-[240px]">
                {TECH_ECOSYSTEM.map(t => (
                  <span
                    key={t.id}
                    className="px-2 py-0.5 rounded-full font-mono text-[9px] border"
                    style={{ color: t.color, borderColor: `${t.color}40`, backgroundColor: `${t.color}10` }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 3D Cube anchor + glow */}
            <div
              id="skills-stage-anchor"
              style={{
                width: isMobile ? 140 : 360,
                height: isMobile ? 140 : 360,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute w-28 h-28 lg:w-56 lg:h-56 rounded-full blur-2xl lg:blur-3xl opacity-20 transition-colors duration-1000 pointer-events-none"
                style={{ backgroundColor: isIdle ? '#94a3b8' : activeTech.color }}
              />

              {/* Local 3D Cube — 100% bebas crop */}
              <InteractiveTechStage3D
                activeIndex={activeIndex}
                freeRotate={isIdle}
                activeColor={isIdle ? '#94a3b8' : activeTech.color}
                size={isMobile ? 140 : 360}
              />
            </div>

            {/* Mobile Card (Hanya muncul di mobile/tablet & tidak idle) */}
            {!isIdle && isMobile && (
              <div
                className="w-full max-w-[340px] mt-2 border rounded-2xl bg-gradient-to-b from-[var(--card)]/90 to-[var(--card)]/60 backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-xl"
                style={{
                  borderColor: `${activeTech.color}25`,
                }}
              >
                <div className="p-3 sm:p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[8.5px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium flex items-center gap-1.5 transition-colors duration-500"
                      style={{ color: activeTech.color, borderColor: `${activeTech.color}28`, backgroundColor: `${activeTech.color}0a` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeTech.color }} />
                      {activeTech.category}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--muted)]">
                      0{activeIndex + 1} / 0{TECH_ECOSYSTEM.length}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold mb-1 text-[var(--ink)] transition-colors duration-500">
                    {activeTech.name}
                  </h3>

                  <p className="font-body text-[var(--muted)] text-[11.5px] leading-snug mb-2">
                    {activeTech.desc}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-white/5">
                    {activeTech.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--muted)]">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: activeTech.color }} />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/5 mx-3" />

                <div className="p-3 sm:p-3.5 pt-2">
                  <div className="flex items-center gap-1 font-mono text-[9px] text-[var(--muted)] mb-1">
                    <ShieldCheck size={11} style={{ color: activeTech.color, opacity: 0.8 }} />
                    <span>Production Architecture</span>
                  </div>

                  <h4 className="text-[13px] font-display font-bold mb-1 text-[var(--ink)] transition-colors duration-500">
                    {activeTech.rightTitle}
                  </h4>

                  <p className="font-body text-[var(--muted)] text-[11px] leading-snug mb-1.5">
                    {activeTech.rightDesc}
                  </p>

                  <span className="font-mono text-[10px] font-medium" style={{ color: activeTech.color }}>
                    {activeTech.tagline}
                  </span>
                </div>
              </div>
            )}

            {/* Scroll indicator (intro mode) */}
            <div
              className="flex flex-col items-center gap-1 mt-1 transition-all duration-500 pointer-events-none"
              style={{ opacity: isIdle ? 0.6 : 0 }}
            >
              <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">scroll untuk explore</span>
              <ChevronDown size={14} className="text-[var(--muted)] animate-bounce" />
            </div>

            {/* Tech Dots (Hidden saat intro / outro mode) */}
            <div
              className="flex items-center gap-3 mt-3 justify-center z-10 transition-all duration-500"
              style={{ opacity: isIdle ? 0 : 1, pointerEvents: isIdle ? 'none' : 'auto' }}
            >
              {TECH_ECOSYSTEM.map((tech, idx) => (
                <button
                  key={tech.id}
                  onClick={() => { setIsIdle(false); setActiveIndex(idx); }}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-500 border ${
                    idx === activeIndex
                      ? 'scale-125 ring-4 ring-white/10 shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                      : 'opacity-40 hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: tech.color,
                    borderColor: idx === activeIndex ? '#ffffff' : 'transparent'
                  }}
                  title={tech.name}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ─────────────────────────────────────────────────────── */}
          <div
            className="hidden lg:flex lg:col-span-4 flex-col space-y-4 transition-all duration-700"
            style={{
              opacity: isIdle ? 0.02 : 1,
              pointerEvents: isIdle ? 'none' : 'auto',
              transform: isIdle ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            <div
              className="border rounded-2xl p-6 bg-gradient-to-b from-[var(--card)]/70 to-[var(--card)]/30 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-[350px] transition-colors duration-500"
              style={{ borderColor: `${activeTech.color}22` }}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted)] mb-4">
                <ShieldCheck size={14} style={{ color: activeTech.color, opacity: 0.8 }} />
                <span>Production Architecture</span>
              </div>

              <h4 className="text-xl font-display font-bold mb-2 text-[var(--ink)] transition-colors duration-500">
                {activeTech.rightTitle}
              </h4>

              <p className="font-body text-[var(--muted)] text-sm leading-relaxed mb-4">
                {activeTech.rightDesc}
              </p>

              <div className="pt-4 border-t border-white/5">
                <span className="font-mono text-xs font-medium" style={{ color: activeTech.color }}>
                  {activeTech.tagline}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="w-full shrink-0 flex items-center justify-center pt-2 relative z-10">
          <span className="font-mono text-xs text-[var(--muted)] flex items-center gap-2">
            <Sparkles size={14} style={{ color: isIdle ? 'var(--muted)' : activeTech.color }} />
            <span>
              {isIdle
                ? 'Scroll kebawah untuk menjelajahi setiap teknologi'
                : 'Scroll kebawah untuk memutar dadu 3D dan merubah warna tema'}
            </span>
          </span>
        </div>

      </div>
    </div>
  );
}
