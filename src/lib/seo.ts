import { profile, siteUrl } from "@/data/profile";

import { formatExperienceYears } from "./duration";

export const seo = {
  title: `${profile.name} — ${profile.headline}`,
  description: `${profile.name}, ${profile.headline} na ${profile.company} e fundador da ${profile.founder}. Backend em C#, .NET Core e Python, arquitetura de software, microserviços e liderança técnica.`,
  ogImage: `${siteUrl}/og-image.png`,
  locale: "pt_BR",
} as const;

/**
 * Meta tags compartilhadas por todas as rotas. Ficam em um lugar só para
 * não divergirem entre o root e as páginas (era o caso antes: o og:description
 * anunciava um tempo de experiência diferente do resto do site).
 */
export function buildSeoMeta() {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "author", content: profile.name },
    { name: "theme-color", content: "#1b1c20" },

    { property: "og:type", content: "profile" },
    { property: "og:site_name", content: profile.founder },
    { property: "og:locale", content: seo.locale },
    { property: "og:url", content: siteUrl },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:image", content: seo.ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${profile.name} — ${profile.headline}` },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.ogImage },
  ];
}

export function buildSeoLinks(appCssHref: string) {
  return [
    { rel: "stylesheet", href: appCssHref },
    { rel: "canonical", href: siteUrl },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ];
}

/** Telefone em E.164, ou undefined enquanto o número não estiver preenchido. */
function whatsappE164(): string | undefined {
  const digits = profile.contacts.find((c) => c.icon === "whatsapp")?.handle.replace(/\D/g, "");
  return digits && digits.length >= 10 ? `+${digits}` : undefined;
}

/** Dados estruturados schema.org — ajudam a busca por nome a resolver no site certo. */
export function buildPersonJsonLd(now = new Date()) {
  const skills = profile.skillCategories.flatMap((category) =>
    category.skills.map((skill) => skill.name),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: seo.ogImage,
    jobTitle: profile.headline,
    description: profile.bio,
    email: profile.contacts.find((contact) => contact.icon === "mail")?.handle,
    // E.164. Fica fora de `sameAs`, que é para perfis — telefone tem
    // propriedade própria no schema.org.
    telephone: whatsappE164(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Matão",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    worksFor: { "@type": "Organization", name: profile.company },
    founder: { "@type": "Organization", name: profile.founder, url: siteUrl },
    knowsAbout: skills,
    sameAs: profile.contacts
      .filter((contact) => contact.href.startsWith("http"))
      .map((contact) => contact.href),
    alumniOf: profile.companyGroups.map((group) => ({
      "@type": "Organization",
      name: group.company,
    })),
    hasOccupation: {
      "@type": "Occupation",
      name: profile.headline,
      experienceRequirements: formatExperienceYears(profile.careerStart, now),
    },
  };
}
