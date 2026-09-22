import { ArrowUpRight, FolderGit2 } from "lucide-react";

import { Section } from "@/components/section";
import { profile, type ProjectItem } from "@/data/profile";

const STATUS_LABEL: Record<ProjectItem["status"], string> = {
  producao: "Em produção",
  desenvolvimento: "Em desenvolvimento",
  entregue: "Entregue",
};

const STATUS_DOT: Record<ProjectItem["status"], string> = {
  producao: "bg-emerald-400",
  desenvolvimento: "bg-amber-400",
  entregue: "bg-sky-400",
};

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-foreground/20">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <h3 className="text-sm font-medium text-foreground">{project.name}</h3>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">{project.tagline}</p>

      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Problema
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Solução
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">{project.outcome}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-5 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-foreground/80"
        >
          Ver funcionando
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
      icon={<FolderGit2 className="h-4 w-4" />}
      title="Projetos"
      subtitle="Produtos que desenhei e construí de ponta a ponta — do domínio ao deploy."
    >
      <div className="grid gap-4">
        {profile.projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
