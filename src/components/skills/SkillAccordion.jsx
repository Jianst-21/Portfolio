'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLayer } from '@/components/providers/LayerProvider';

const skillSections = [
  {
    id: 'frontend',
    number: '01',
    name: 'Interface',
    color: 'var(--fe)',
    skills: ['React', 'Next.js', 'TailwindCSS', 'HTML/CSS', 'Figma', 'Responsive Design']
  },
  {
    id: 'backend',
    number: '02',
    name: 'Logic',
    color: 'var(--be)',
    skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'REST API']
  },
  {
    id: 'ai',
    number: '03',
    name: 'Intelligence',
    color: 'var(--ai)',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'Pandas']
  }
];

export default function SkillAccordion() {
  const { activeLayer } = useLayer();
  const [openSections, setOpenSections] = useState({
    frontend: true,
    backend: false,
    ai: false
  });

  useEffect(() => {
    if (activeLayer && activeLayer !== 'none') {
      setOpenSections(prev => ({
        ...prev,
        [activeLayer]: true
      }));
    }
  }, [activeLayer]);

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {skillSections.map(section => {
        const isOpen = openSections[section.id];
        return (
          <div 
            key={section.id} 
            className="border border-[var(--line)] bg-[var(--card)] rounded-2xl overflow-hidden transition-all duration-300"
            style={{ 
              borderLeftWidth: isOpen ? '4px' : '1px',
              borderLeftColor: isOpen ? section.color : 'var(--line)' 
            }}
          >
            <button 
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-[var(--muted)]">{section.number}</span>
                <span className="font-display text-xl font-semibold" style={{ color: isOpen ? section.color : 'var(--ink)' }}>
                  {section.name}
                </span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="p-6 pt-0 flex flex-wrap gap-2.5">
                  {section.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="bg-[var(--bg)] border border-[var(--line)] text-[var(--muted)] font-mono text-sm px-3.5 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
