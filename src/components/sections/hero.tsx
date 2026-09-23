import { ArrowDown, Mail } from "lucide-react";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import gabrielPhoto from "@/assets/gabriel.png";
import { profile } from "@/data/profile";
import { resolveContacts } from "@/lib/contacts";
import { formatExperienceYears } from "@/lib/duration";

export function Hero() {
  const contacts = resolveContacts(profile.contacts);
  const whatsapp = contacts.find((contact) => contact.icon === "whatsapp");
  const email = contacts.find((contact) => contact.icon === "mail");

  const highlights = [
    { label: "Experiência", value: formatExperienceYears(profile.careerStart) },
    { label: "Cargo atual", value: "Tech Lead" },
    { label: "Especialidade", value: "Backend & Arquitetura" },
  ];

  return (
    <section id="sobre" className="section-anchor pt-10 sm:pt-14">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-7">
        <div className="relative shrink-0">
          <div className="absolute -inset-2 rounded-full bg-brand/15 blur-xl" />
          <img
            src={gabrielPhoto}
            alt={`Retrato de ${profile.name}`}
            width={384}
            height={384}
            fetchPriority="high"
            className="relative h-28 w-28 rounded-full border border-border object-cover shadow-[0_8px_30px_rgba(0,0,0,0.6)] sm:h-32 sm:w-32"
          />
        </div>

        <div className="min-w-0 text-center sm:text-left">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <span className="availability-dot h-1.5 w-1.5 rounded-full bg-brand" />
              Disponível para projetos
            </span>
          )}

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 font-mono text-sm text-brand sm:text-base">{profile.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.company} · {profile.location}
          </p>
        </div>
      </div>

      <p className="mt-7 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-left sm:text-lg">
        {profile.bio}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {whatsapp && (
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chamar no WhatsApp
          </a>
        )}
        {email && (
          <a
            href={email.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/25 hover:bg-accent"
          >
            <Mail className="h-4 w-4" />
            Enviar e-mail
          </a>
        )}
        <a
          href="#projetos"
          className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowDown className="h-4 w-4" />
          Ver projetos
        </a>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="card-lift rounded-xl border border-border bg-card/50 px-4 py-4 text-center backdrop-blur-sm sm:text-left"
          >
            <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
