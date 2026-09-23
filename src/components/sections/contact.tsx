import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";

import { Section } from "@/components/section";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { profile } from "@/data/profile";
import { resolveContacts, type ResolvedContact } from "@/lib/contacts";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  whatsapp: WhatsAppIcon,
} as const;

/** Canais principais viram cartão grande; os perfis ficam em lista secundária. */
function PrimaryCard({ contact }: { contact: ResolvedContact }) {
  const Icon = ICONS[contact.icon];
  const isWhatsApp = contact.icon === "whatsapp";

  return (
    <a
      href={contact.href}
      {...(contact.href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`card-lift group flex items-center gap-4 rounded-xl border p-5 ${
        isWhatsApp
          ? "border-brand/30 bg-brand/[0.07] hover:bg-brand/10"
          : "border-border bg-card/50 hover:bg-accent/40"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
          isWhatsApp ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">
          {isWhatsApp ? "Chamar no WhatsApp" : "Enviar e-mail"}
        </span>
        <span className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
          {contact.handle}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function ProfileLink({ contact }: { contact: ResolvedContact }) {
  const Icon = ICONS[contact.icon];

  return (
    <a
      href={contact.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-accent/40"
    >
      <span className="flex min-w-0 items-center gap-3">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        <span className="shrink-0 text-sm text-foreground">{contact.label}</span>
        <span className="truncate font-mono text-xs text-muted-foreground">{contact.handle}</span>
      </span>
      <ArrowUpRight className="ml-3 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

export function Contact() {
  const contacts = resolveContacts(profile.contacts);
  const primary = contacts.filter((contact) => contact.primary);
  const profiles = contacts.filter((contact) => !contact.primary);

  return (
    <Section
      id="contato"
      icon={<Send className="h-4 w-4" />}
      title="Contato"
      subtitle="Vamos conversar sobre projetos, oportunidades ou troca técnica. Respondo em até um dia útil."
    >
      {primary.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {primary.map((contact) => (
            <PrimaryCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}

      {profiles.length > 0 && (
        <div className="mt-3 flex flex-col divide-y divide-border rounded-xl border border-border bg-card/40">
          {profiles.map((contact) => (
            <ProfileLink key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </Section>
  );
}
