import { describe, expect, it } from "vitest";

import { resolveContacts } from "./contacts";
import type { ContactItem } from "@/data/profile";

const whatsapp = (handle: string): ContactItem => ({
  id: "whatsapp",
  label: "WhatsApp",
  handle,
  href: "",
  icon: "whatsapp",
});

describe("resolveContacts", () => {
  it("deriva o link wa.me e a máscara a partir do número", () => {
    const [contact] = resolveContacts([whatsapp("5516996200340")]);
    expect(contact.href).toBe("https://wa.me/5516996200340");
    expect(contact.handle).toBe("(16) 99620-0340");
  });

  it("aceita o número com máscara, símbolos ou espaços", () => {
    for (const entrada of ["+55 16 99620-0340", "+55 (16) 99620 0340", "55.16.99620.0340"]) {
      const [contact] = resolveContacts([whatsapp(entrada)]);
      expect(contact.href).toBe("https://wa.me/5516996200340");
    }
  });

  it("formata número fixo de 8 dígitos", () => {
    const [contact] = resolveContacts([whatsapp("551633215678")]);
    expect(contact.handle).toBe("(16) 3321-5678");
  });

  it("descarta o contato enquanto o número não estiver preenchido", () => {
    expect(resolveContacts([whatsapp("")])).toEqual([]);
    expect(resolveContacts([whatsapp("1234")])).toEqual([]);
  });

  it("descarta qualquer contato sem href, para nunca renderizar link morto", () => {
    const vazio: ContactItem = {
      id: "github",
      label: "GitHub",
      handle: "@x",
      href: "",
      icon: "github",
    };
    expect(resolveContacts([vazio])).toEqual([]);
  });

  it("mantém intactos os contatos que já têm href", () => {
    const linkedin: ContactItem = {
      id: "linkedin",
      label: "LinkedIn",
      handle: "gabriel-victorino",
      href: "https://www.linkedin.com/in/gabriel-victorino/",
      icon: "linkedin",
    };
    expect(resolveContacts([linkedin])).toEqual([linkedin]);
  });
});
