'use client';

import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LAYER_LABELS = { fe: 'Interface', be: 'Logic', ai: 'Intelligence' };

export default function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGradientPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
  };

  const layerColors = {
    fe: 'var(--fe)',
    be: 'var(--be)',
    ai: 'var(--ai)',
  };
  const accent = layerColors[project.layer];

  return (
    <div
      className="group relative [perspective:1000px] h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        className="h-full relative overflow-hidden bg-[var(--card)] border rounded-[14px] transition-[transform,border-color] duration-200 ease-out [transform-style:preserve-3d] flex flex-col"
        style={{
          transform,
          borderColor: isHovered
            ? `color-mix(in srgb, ${accent} 55%, transparent)`
            : `color-mix(in srgb, ${accent} 14%, transparent)`,
        }}
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 25% 20%, color-mix(in srgb, ${accent} 30%, transparent), transparent 60%), linear-gradient(150deg, var(--card), var(--bg))`,
              }}
            >
              <span
                className="font-display font-extrabold text-5xl select-none"
                style={{ color: `color-mix(in srgb, ${accent} 35%, transparent)` }}
              >
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Bottom fade so the card body reads as one continuous surface */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />

          {/* Category badge */}
          <span
            className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5"
            style={{
              color: accent,
              backgroundColor: 'color-mix(in srgb, var(--bg) 55%, transparent)',
              border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
            {LAYER_LABELS[project.layer]}
          </span>
        </div>

        {/* Spotlight (only over the body now) */}
        <div
          className={`absolute inset-x-0 bottom-0 top-[40%] pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, color-mix(in srgb, ${accent} 8%, transparent) 0%, transparent 60%)`
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 flex-grow flex flex-col">
          <h3 className="font-display text-[var(--ink)] font-semibold text-xl mb-2">{project.title}</h3>
          <p className="text-[var(--muted)] text-sm mb-5 flex-grow leading-relaxed">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="bg-[var(--bg)] border border-[var(--line)] text-[var(--muted)] font-mono text-[10px] px-2 py-1 rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Card is fully clickable, links are in modal preview */}
        </div>
      </div>
    </div>
  );
}
