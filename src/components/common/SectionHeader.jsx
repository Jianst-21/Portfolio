export default function SectionHeader({ title, highlight, align = 'center' }) {
  if (!title) return null;
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-4xl sm:text-5xl md:text-5xl font-display font-extrabold text-[var(--ink)] tracking-tight">
        {titleParts.length > 1 ? (
          <>
            {titleParts[0]}
            <span className="text-[var(--active)]">{highlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}
