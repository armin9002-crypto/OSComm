export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold/90">{eyebrow}</p>}
      <h1 className="mt-3 max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-chalk md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">{description}</p>
    </div>
  );
}
