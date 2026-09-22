import { ArrowDown, Mail } from "lucide-react";

import gabrielPhoto from "@/assets/gabriel.png";
import { profile } from "@/data/profile";
import { formatExperienceYears } from "@/lib/duration";

export function Hero() {
  const experienceYears = formatExperienceYears(profile.careerStart);
  const primaryContact = profile.contacts.find((contact) => contact.primary && contact.href);

  const highlights = [
    { label: "Experiência", value: experienceYears },
    { label: "Cargo atual", value: "Tech Lead" },
    { label: "Especialidade", value: "Backend & Arquitetura" },
  ];

  return (
    <section id="sobre" className="section-anchor pt-10 sm:pt-12">
      <div className="relative mx-auto w-fit sm:mx-0">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/10 to-white/0 blur-sm" />
        <img
          src={gabrielPhoto}
          alt={`Retrato de ${profile.name}`}
          width={384}
          height={384}
          fetchPriority="high"
          className="relative h-32 w-32 rounded-full border border-border object-cover shadow-[0_8px_30px_rgba(0,0,0,0.6)] sm:h-36 sm:w-36"
        />
      </div>

      <p className="mt-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground sm:text-left">
        Olá, eu sou
      </p>
      <h1 className="mt-3 text-center text-3xl font-medium tracking-tight sm:text-left sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-center font-mono text-sm text-muted-foreground sm:text-left">
        {profile.headline}
      </p>
      <p className="mt-1 text-center text-sm text-muted-foreground sm:text-left">
        {profile.company} · {profile.location}
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:mx-0 sm:text-left sm:text-lg">
        {profile.bio}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {primaryContact && (
          <a
            href={primaryContact.href}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            Entrar em contato
          </a>
        )}
        <a
          href="#projetos"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <ArrowDown className="h-4 w-4" />
          Ver projetos
        </a>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border bg-card/50 px-3 py-4 text-center backdrop-blur-sm sm:px-4"
          >
            <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground sm:text-base">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
