'use client';
import React from 'react';

export default function TabSwitch({ activeTab, onTabChange }) {
  const tabs = ['Kerja', 'Pendidikan'];
  return (
    <div className="flex flex-row gap-3">
      {tabs.map(tab => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-5 py-2 rounded-full font-mono text-sm uppercase transition-colors duration-300 ${isActive ? 'bg-[var(--active)] text-[var(--bg)] border border-[var(--active)]' : 'bg-transparent border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--muted)]'}`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
