import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { stickerByKey } from "@/data/sticker-assets";
import type { StickerKey } from "@/data/skill-stickers";

function SkillPill({ name, stickerKey }: { name: string; stickerKey?: StickerKey }) {
  const stickerSrc = stickerKey ? stickerByKey[stickerKey] : undefined;

  return (
    <li className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-[13px] text-foreground">
      {stickerSrc && (
        <img
          src={stickerSrc}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-4 w-4 object-contain"
          width={16}
          height={16}
        />
      )}
      {name}
    </li>
  );
}

/**
 * Lista de definição, sem moldura de cartão: a categoria fica na coluna da
 * esquerda e as pills correm à direita. Como cartão, esta seção tinha a mesma
 * silhueta de Projetos e Certificações — três grades seguidas faziam o site
 * parecer montado a partir de um template.
 */
export function Skills() {
  return (
    <Section
      id="habilidades"
      number="02"
      title="Habilidades"
      subtitle="Stack e competências que aplico no dia a dia — alinhadas ao meu perfil profissional."
    >
      <dl className="space-y-7">
        {profile.skillCategories.map((category) => (
          <div key={category.id} className="sm:grid sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="sm:pt-0.5">
              <span className="t-title block text-foreground">{category.title}</span>
              <span className="t-meta mt-0.5 block text-muted-foreground">
                {category.description}
              </span>
            </dt>
            <dd className="mt-3 sm:mt-0">
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillPill key={skill.name} name={skill.name} stickerKey={skill.stickerKey} />
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
