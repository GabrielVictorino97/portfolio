import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section";
import { profile, type ProjectItem } from "@/data/profile";

const STATUS_LABEL: Record<ProjectItem["status"], string> = {
  producao: "Em produção",
  desenvolvimento: "Em desenvolvimento",
  entregue: "Entregue",
};

const STATUS_DOT: Record<ProjectItem["status"], string> = {
  producao: "bg-brand",
  desenvolvimento: "bg-amber-400",
  entregue: "bg-sky-400",
};

/**
 * Bloco largo, um por linha — e não cartão numa grade. São poucos projetos e
 * cada um tem texto de verdade a dizer; espremê-los lado a lado obrigaria a
 * cortar o conteúdo e deixaria esta seção com a mesma silhueta de todas as
 * outras.
 */
function ProjectBlock({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article className="relative border-t border-border pt-6 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="t-label text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="t-title text-foreground">{project.name}</h3>
        <span className="t-meta ml-auto flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className="t-meta mt-1 text-muted-foreground">{project.tagline}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="t-label text-muted-foreground">Problema</h4>
          <p className="t-body mt-2 text-muted-foreground">{project.problem}</p>
        </div>
        <div>
          <h4 className="t-label text-muted-foreground">Solução</h4>
          <p className="t-body mt-2 text-foreground/85">{project.outcome}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
        {project.stack.map((tech) => (
          <span key={tech} className="t-meta font-mono text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-opacity hover:opacity-80"
        >
          {project.href.includes("github.com") ? "Ver o código" : "Ver funcionando"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projetos"
      number="01"
      title="Projetos"
      subtitle="Produtos que desenhei e construí de ponta a ponta — do domínio ao deploy."
    >
      <div className="space-y-8">
        {profile.projects.map((project, index) => (
          <ProjectBlock key={project.name} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
