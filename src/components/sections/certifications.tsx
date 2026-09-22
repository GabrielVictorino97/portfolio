import { useMemo, useState } from "react";
import { Award, ChevronDown } from "lucide-react";

import { Section } from "@/components/section";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { profile, type CertificationItem } from "@/data/profile";

function CertificationCard({ cert }: { cert: CertificationItem }) {
  return (
    <li className="card-lift flex flex-col justify-center rounded-lg border border-border/60 bg-background/50 px-4 py-3">
      <p className="text-sm font-medium text-foreground">{cert.title}</p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        {cert.issuer} · {cert.year}
      </p>
    </li>
  );
}

/**
 * Substitui o carrossel com autoplay: os itens escondidos de um carrossel
 * continuam no fluxo de Tab (armadilha para teclado) e o movimento automático
 * não tinha controle de pausa acessível. Aqui tudo que está oculto está
 * realmente fora da árvore, e nada se move sozinho.
 */
export function Certifications() {
  const [showAll, setShowAll] = useState(false);

  const { featured, rest } = useMemo(() => {
    const all = profile.certifications;
    return {
      featured: all.filter((cert) => cert.featured),
      rest: all.filter((cert) => !cert.featured),
    };
  }, []);

  if (featured.length === 0 && rest.length === 0) {
    return null;
  }

  return (
    <Section
      id="certificacoes"
      icon={<Award className="h-4 w-4" />}
      title="Certificações"
      subtitle={`Formação contínua em arquitetura, .NET e dados — ${profile.certifications.length} certificações concluídas.`}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {featured.map((cert) => (
          <CertificationCard key={cert.title} cert={cert} />
        ))}
      </ul>

      {rest.length > 0 && (
        <Collapsible open={showAll} onOpenChange={setShowAll} className="mt-3">
          <CollapsibleContent>
            <ul className="grid gap-3 pb-3 sm:grid-cols-2">
              {rest.map((cert) => (
                <CertificationCard key={cert.title} cert={cert} />
              ))}
            </ul>
          </CollapsibleContent>

          <CollapsibleTrigger className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
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
