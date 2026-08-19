import React from 'react';

const facts = [
  { label: 'Lokasi', value: 'Purwokerto, Jawa Tengah' },
  { label: 'Fokus', value: 'Fullstack & AI' },
  { label: 'Status', value: 'Mahasiswa (Aktif)' },
  { label: 'Pengalaman', value: '2+ Tahun' },
];

export default function QuickFacts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {facts.map((fact, index) => (
        <div key={index} className="bg-[var(--card)] border border-[var(--line)] rounded-xl p-4 flex flex-col justify-center">
          <span className="font-mono text-xs uppercase text-[var(--muted)] mb-1">{fact.label}</span>
          <span className="font-display text-[var(--ink)]">{fact.value}</span>
        </div>
      ))}
    </div>
  );
}
