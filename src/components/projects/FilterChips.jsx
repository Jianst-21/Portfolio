'use client';

import { useLayer } from '@/components/providers/LayerProvider';

const filters = [
  { label: 'Semua', value: 'all', color: 'var(--fe)' },
  { label: 'Interface', value: 'fe', color: 'var(--fe)' },
  { label: 'Logic', value: 'be', color: 'var(--be)' },
  { label: 'Intelligence', value: 'ai', color: 'var(--ai)' },
];

export default function FilterChips() {
  const { activeLayer, setActiveLayer } = useLayer();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {filters.map((f) => {
        const isActive = activeLayer === f.value;
        return (
          <button
            key={f.value}
            onClick={() => setActiveLayer(f.value)}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
              isActive
                ? 'text-[var(--bg)]'
                : 'bg-transparent border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--muted)]'
            }`}
            style={{
              backgroundColor: isActive ? f.color : 'transparent',
              borderColor: isActive ? f.color : undefined,
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
