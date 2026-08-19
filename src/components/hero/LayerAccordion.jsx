'use client';

import React from 'react';
import { useLayer } from '@/components/providers/LayerProvider';

const LAYERS = [
  {
    id: 'fe',
    number: '01',
    name: 'Interface',
    desc: 'Frontend, UI/UX, desain responsif — lapisan yang dilihat dan dirasakan user.',
    colorVar: 'var(--fe)'
  },
  {
    id: 'be',
    number: '02',
    name: 'Logic',
    desc: 'Backend, API, database, arsitektur — mesin di balik layar.',
    colorVar: 'var(--be)'
  },
  {
    id: 'ai',
    number: '03',
    name: 'Intelligence',
    desc: 'Machine learning, NLP, computer vision — membuat produk berpikir.',
    colorVar: 'var(--ai)'
  }
];

export function LayerAccordion() {
  const { activeLayer, setActiveLayer } = useLayer();

  const expandedId = activeLayer === 'all' ? 'fe' : activeLayer;

  return (
    <div className="flex flex-col gap-3">
      {LAYERS.map((layer) => {
        const isExpanded = expandedId === layer.id;
        
        return (
          <div 
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className="group cursor-pointer rounded-lg border overflow-hidden transition-all duration-300 relative bg-[var(--card)] border-[var(--line)] hover:border-[var(--muted)]"
          >
            {/* Accent color bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
              style={{ 
                backgroundColor: isExpanded ? layer.colorVar : 'transparent' 
              }}
            />
            
            <div className="p-4 pl-6 flex flex-col">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm opacity-50" style={{ color: isExpanded ? layer.colorVar : 'var(--ink)' }}>
                  {layer.number}
                </span>
                <span className="font-display font-semibold text-lg" style={{ color: isExpanded ? layer.colorVar : 'var(--ink)' }}>
                  {layer.name}
                </span>
              </div>
              
              <div 
                className="grid transition-all duration-300 ease-in-out"
                style={{ 
                  gridTemplateRows: isExpanded ? '1fr' : '0fr',
                  opacity: isExpanded ? 1 : 0
                }}
              >
                <div className="overflow-hidden">
                  <p className="pt-2 text-sm font-body text-[var(--muted)] leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
