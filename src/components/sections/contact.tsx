import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Send } from "lucide-react";

import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { resolveContacts, type ResolvedContact } from "@/lib/contacts";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  whatsapp: MessageCircle,
} as const;

function ContactLink({ contact }: { contact: ResolvedContact }) {
  const Icon = ICONS[contact.icon];
  const isExternal = contact.href.startsWith("http");

  return (
    <a
      href={contact.href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-accent/40"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
          <Icon className="h-4 w-4" />
        </span>
        <span className="shrink-0 text-sm text-foreground">{contact.label}</span>
        <span className="truncate font-mono text-xs text-muted-foreground">{contact.handle}</span>
      </div>
      <ArrowUpRight className="ml-3 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

export function Contact() {
  const contacts = resolveContacts(profile.contacts);
  const primary = contacts.find((contact) => contact.primary);

  return (
    <Section
      id="contato"
      icon={<Send className="h-4 w-4" />}
      title="Contato"
      subtitle="Vamos conversar sobre projetos, oportunidades ou troca técnica. Respondo em até um dia útil."
    >
      {primary && (
        <a
          href={primary.href}
          {...(primary.href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
          className="mb-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Mail className="h-4 w-4" />
          Falar por {primary.label.toLowerCase()}
        </a>
      )}

      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card/50 shadow-[0_0_40px_rgba(0,0,0,0.15)] backdrop-blur-sm">
        {contacts.map((contact) => (
          <ContactLink key={contact.id} contact={contact} />
        ))}
      </div>
    </Section>
  );
}
