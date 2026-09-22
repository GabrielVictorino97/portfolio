import { Briefcase } from "lucide-react";

import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { computeCompanyDuration, formatExperienceYears } from "@/lib/duration";

export function Experience() {
  return (
    <Section
      id="experiencia"
      icon={<Briefcase className="h-4 w-4" />}
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
                  isCurrent ? "bg-emerald-400" : "bg-muted-foreground/50"
                }`}
              />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground">{group.company}</h3>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {computeCompanyDuration(group.roles)}
                </span>
              </div>
              {group.location && (
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{group.location}</p>
              )}

              <div className="mt-3 space-y-4">
                {group.roles.map((role) => (
                  <div
                    key={role.role}
                    className="rounded-lg border border-border/50 bg-background/40 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-sm font-medium text-foreground/90">{role.role}</h4>
                      <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
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
