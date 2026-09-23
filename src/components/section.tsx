export function Section({
  id,
  number,
  title,
  subtitle,
  children,
}: {
  id: string;
  /** Ordinal exibido antes do título — dá estrutura sem precisar de ícone. */
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-anchor pt-16 sm:pt-24">
      <div className="flex items-baseline gap-3">
        <span className="t-label text-brand">{number}</span>
        <h2 className="t-label text-foreground">{title}</h2>
        <span className="h-px flex-1 translate-y-[-0.2em] bg-gradient-to-r from-border to-transparent" />
      </div>
      <p className="t-body mt-3 max-w-xl text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}
