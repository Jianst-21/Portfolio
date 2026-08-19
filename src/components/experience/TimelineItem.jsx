import React from 'react';

export default function TimelineItem({ period, position, org, desc, tags, isLast }) {
  return (
    <div className="relative pl-8 md:pl-10 pb-12">
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[var(--active)] border-[3px] border-[var(--card)] z-10" />
      {!isLast && (
        <div className="absolute left-[5px] top-4 bottom-0 w-[1px] bg-[var(--line)]" />
      )}
      <div className="flex flex-col gap-1.5 mb-3">
        <span className="font-mono text-xs text-[var(--muted)]">{period}</span>
        <h4 className="font-display text-lg text-[var(--ink)] font-semibold">{position}</h4>
        <span className="font-body text-sm text-[var(--muted)] font-medium">{org}</span>
      </div>
      <p className="font-body text-sm text-[var(--muted)] leading-relaxed mb-4 max-w-2xl">
        {desc}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-[var(--card)] border border-[var(--line)] text-[var(--muted)] font-mono text-xs px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
