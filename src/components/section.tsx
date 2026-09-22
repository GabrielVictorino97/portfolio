export function Section({
  id,
  icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-anchor pt-14 sm:pt-20">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}
