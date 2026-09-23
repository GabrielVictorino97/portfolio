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
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-brand/25 bg-brand/10 text-brand">
            {icon}
          </span>
        )}
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground">{title}</h2>
        {/* Régua até a margem: dá peso ao título sem precisar aumentar a fonte. */}
        <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}
