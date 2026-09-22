import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { profile } from "@/data/profile";
import { resolveContacts } from "@/lib/contacts";

/**
 * Botão fixo de WhatsApp. É o que mantém o contato ao alcance em qualquer
 * ponto da página — sem ele, quem rola até as certificações precisa voltar
 * ao topo ou chegar ao fim para encontrar como falar.
 *
 * Não renderiza se o número não estiver preenchido, pela mesma regra do resto
 * dos contatos: nunca mostrar link morto.
 */
export function FloatingContact() {
  const whatsapp = resolveContacts(profile.contacts).find((contact) => contact.icon === "whatsapp");
  if (!whatsapp) return null;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Falar com ${profile.name} no WhatsApp`}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand py-3 pl-3 pr-3 text-brand-foreground shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all hover:pr-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      {/* O rótulo cresce a partir de zero no hover: o botão fica discreto
          enquanto se lê a página e se explica quando recebe atenção. */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:opacity-100 motion-reduce:transition-none">
        Falar no WhatsApp
      </span>
    </a>
  );
}
