'use client';

import { useState, useEffect } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useLayer } from '@/components/providers/LayerProvider';
import FilterChips from '@/components/projects/FilterChips';
import ProjectCard from '@/components/projects/ProjectCard';
import { X, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Stellarum',
    desc: 'Portal interaktif eksplorasi astronomi dan visualisasi 3D tata surya menggunakan WebGL, simulasi orbit planet, dan backend Node.js.',
    layer: 'fe',
    tags: ['Next.js', 'Node.js', 'Three.js', 'WebGL'],
    url: 'https://stellarum-pearl.vercel.app/',
    image: '/assets/stellarum.jpg'
  },
  {
    title: 'Abyakta',
    desc: 'Platform reservasi perumahan dan katalog unit properti terstruktur dengan integrasi Next.js, Node.js, dan database cloud Supabase.',
    layer: 'fe',
    tags: ['Next.js', 'Node.js', 'Supabase', 'TailwindCSS'],
    url: 'https://geefi-residence.vercel.app/',
    image: '/assets/abyakta.jpg'
  },
  {
    title: 'Ibravia',
    desc: 'Sistem administrasi, reservasi, dan pelaporan internal berbasis React.js dengan backend runtime Node.js dan sinkronisasi Supabase.',
    layer: 'be',
    tags: ['React.js', 'Node.js', 'Supabase', 'TailwindCSS'],
    url: 'https://tubes-ibravia.vercel.app/',
    image: '/assets/ibravia.jpg'
  },
  {
    title: 'HeyHRS',
    desc: 'Platform internal administrasi karyawan, absensi, dan laporan operasional harian berbasis Node.js guna digitalisasi proses bisnis.',
    layer: 'be',
    tags: ['React.js', 'Node.js', 'ExpressJS', 'Supabase'],
    url: 'https://heyhrs.vercel.app/',
    image: '/assets/heyhrs.jpg'
  },
  {
    title: 'Website DPRD Purbalingga',
    desc: 'Mengembangkan portal informasi resmi DPRD Kabupaten Purbalingga berbasis CMS WordPress dengan kustomisasi tema dan fungsionalitas PHP manual secara terstruktur.',
    layer: 'be',
    tags: ['WordPress', 'PHP', 'HTML/CSS', 'MySQL'],
    url: 'https://dprd.purbalinggakab.go.id/',
    image: '/assets/dprd.jpg'
  }
];

export default function ProjectsSection() {
  const { activeLayer } = useLayer();
  const [activePreview, setActivePreview] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (activePreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePreview]);

  const filteredProjects = activeLayer === 'all' 
    ? projects 
    : projects.filter(p => p.layer === activeLayer);

  const openPreview = (project) => {
    setActivePreview(project);
    setIframeLoading(true);
    setDeviceMode('desktop');
  };

  const closePreview = () => {
    setActivePreview(null);
  };

  return (
    <section id="proyek" className="py-20 w-full relative">
      <SectionHeader title="Proyek Terpilih" highlight="Terpilih" />
      
      <RevealOnScroll>
        <FilterChips />
      </RevealOnScroll>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
        {filteredProjects.map((project, idx) => (
          <RevealOnScroll key={project.title} delay={idx * 100}>
            <ProjectCard project={project} onClick={() => openPreview(project)} />
          </RevealOnScroll>
        ))}
      </div>

      {/* Interactive Live Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-[1000] flex flex-col justify-end bg-black/60 backdrop-blur-md p-0 md:p-6 transition-all duration-300">
          
          {/* Modal Card */}
          <div className="w-full max-w-[1280px] mx-auto h-[100dvh] md:h-[calc(100vh-80px)] bg-[#0A0908] border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Top Navigation Control Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#11100F] border-b border-white/5 shrink-0">
              
              {/* Left Details */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <h3 className="font-display text-white font-bold text-lg leading-tight">
                  {activePreview.title}
                </h3>
                <span className="font-mono text-[10px] text-amber-200/80 px-2.5 py-0.5 border border-amber-200/20 bg-amber-200/5 rounded-full w-fit">
                  {activePreview.url.replace('https://', '')}
                </span>
              </div>
              
              {/* Center Responsive Device Toggle */}
              <div className="hidden md:flex items-center bg-black/30 border border-white/5 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
                    deviceMode === 'desktop'
                      ? 'bg-[var(--active)] text-[var(--bg)] font-bold shadow'
                      : 'text-[var(--muted)] hover:text-white'
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
                    deviceMode === 'tablet'
                      ? 'bg-[var(--active)] text-[var(--bg)] font-bold shadow'
                      : 'text-[var(--muted)] hover:text-white'
                  }`}
                >
                  Tablet
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
                    deviceMode === 'mobile'
                      ? 'bg-[var(--active)] text-[var(--bg)] font-bold shadow'
                      : 'text-[var(--muted)] hover:text-white'
                  }`}
                >
                  Mobile
                </button>
              </div>

              {/* Right Exit and Open Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={activePreview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-white border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl transition-all font-medium"
                >
                  <span>Buka Live</span>
                  <ExternalLink size={13} />
                </a>
                
                <button
                  onClick={closePreview}
                  className="p-1.5 rounded-xl border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-white transition-all"
                  aria-label="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>

            </div>

            {/* Embed Arena */}
            <div className="flex-grow w-full bg-[#050403]/90 flex items-center justify-center p-4 relative overflow-hidden">
              
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050403] gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--active)] border-t-transparent animate-spin" />
                  <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest">
                    Memuat Tampilan Live...
                  </span>
                </div>
              )}

              <div
                className="h-full bg-black rounded-xl overflow-hidden shadow-2xl border border-white/5 relative"
                style={{
                  width: deviceMode === 'desktop' ? '100%' : deviceMode === 'tablet' ? '768px' : '375px',
                  maxWidth: '100%',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <iframe
                  src={activePreview.url}
                  className="w-full h-full border-none bg-white"
                  onLoad={() => setIframeLoading(false)}
                  title={`Live Preview - ${activePreview.title}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

            </div>

          </div>

        </div>
      )}
    </section>
  );
}
