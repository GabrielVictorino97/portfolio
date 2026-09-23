import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { computeCompanyDuration, formatExperienceYears } from "@/lib/duration";

export function Experience() {
  return (
    <Section
      id="experiencia"
      number="03"
      title="Experiência"
      subtitle={`Trajetória de ${formatExperienceYears(profile.careerStart)} em desenvolvimento de software.`}
    >
      <ol className="relative space-y-0 border-l border-border pl-6">
        {profile.companyGroups.map((group) => {
          const isCurrent = group.roles.some((role) => role.current);

          return (
            <li key={group.company} className="relative pb-10 last:pb-0">
              <span
                className={`absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-background ${
                  isCurrent ? "availability-dot bg-brand" : "bg-muted-foreground/50"
                }`}
              />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="t-title text-foreground">{group.company}</h3>
                <span className="t-meta shrink-0 font-mono text-muted-foreground">
                  {computeCompanyDuration(group.roles)}
                </span>
              </div>
              {group.location && (
                <p className="t-meta mt-0.5 font-mono text-muted-foreground">{group.location}</p>
              )}

              <div className="mt-3 space-y-4">
                {group.roles.map((role) => (
                  <div
                    key={role.role}
                    className="rounded-lg border border-border/50 bg-background/40 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-[15px] font-medium text-foreground/90">{role.role}</h4>
                      <span className="t-meta font-mono text-muted-foreground">{role.period}</span>
                    </div>
                    <ul className="t-meta mt-2 space-y-1 text-muted-foreground">
                      {role.highlights.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
