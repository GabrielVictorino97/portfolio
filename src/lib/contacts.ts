import type { ContactItem } from "@/data/profile";

/** Formata "5516999998888" como "(16) 99999-8888". */
function formatBrazilianPhone(digits: string): string {
  const local = digits.startsWith("55") ? digits.slice(2) : digits;
  const match = local.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (!match) return digits;
  return `(${match[1]}) ${match[2]}-${match[3]}`;
}

export type ResolvedContact = ContactItem & { href: string; handle: string };

/**
 * O WhatsApp é configurado só pelo número em `profile.contacts` — o link
 * wa.me é derivado aqui para não haver duas fontes da verdade.
 */
function resolve(contact: ContactItem): ResolvedContact | null {
  if (contact.icon === "whatsapp") {
    const digits = contact.handle.replace(/\D/g, "");
    if (digits.length < 10) return null;
    return { ...contact, href: `https://wa.me/${digits}`, handle: formatBrazilianPhone(digits) };
  }

  if (!contact.href) return null;
  return { ...contact, href: contact.href, handle: contact.handle };
}

/** Descarta contatos ainda não preenchidos, para nunca renderizar link morto. */
export function resolveContacts(contacts: readonly ContactItem[]): ResolvedContact[] {
  return contacts.map(resolve).filter((contact): contact is ResolvedContact => contact !== null);
}
