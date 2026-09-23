import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Section } from "@/components/section";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { profile, type CertificationItem } from "@/data/profile";

/**
 * Linhas, não cartões. São 24 itens de texto curto: em cartão, cada um ganha
 * moldura e respiro que não carregam informação nenhuma, e a seção fica com a
 * mesma silhueta das outras.
 */
function CertificationRow({ cert, featured }: { cert: CertificationItem; featured?: boolean }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-t border-border/60 py-3 first:border-t-0">
      <span className={`t-body ${featured ? "text-foreground" : "text-muted-foreground"}`}>
        {cert.title}
      </span>
      <span className="t-meta shrink-0 font-mono text-muted-foreground">
        {cert.issuer} · {cert.year}
      </span>
    </li>
  );
}

export function Certifications() {
  const [showAll, setShowAll] = useState(false);

  const { featured, rest } = useMemo(() => {
    const all = profile.certifications;
    return {
      featured: all.filter((cert) => cert.featured),
      rest: all.filter((cert) => !cert.featured),
    };
  }, []);

  if (featured.length === 0 && rest.length === 0) return null;

  return (
    <Section
      id="certificacoes"
      number="04"
      title="Certificações"
      subtitle={`Formação contínua em arquitetura, .NET e dados — ${profile.certifications.length} certificações concluídas.`}
    >
      <ul>
        {featured.map((cert) => (
          <CertificationRow key={cert.title} cert={cert} featured />
        ))}
      </ul>

      {rest.length > 0 && (
        <Collapsible open={showAll} onOpenChange={setShowAll} className="mt-1">
          <CollapsibleContent>
            <ul>
              {rest.map((cert) => (
                <CertificationRow key={cert.title} cert={cert} />
              ))}
            </ul>
          </CollapsibleContent>

          <CollapsibleTrigger className="t-label mt-4 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
            {showAll ? "Mostrar menos" : `Ver todas (+${rest.length})`}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
              aria-hidden
            />
          </CollapsibleTrigger>
        </Collapsible>
      )}
    </Section>
  );
}
