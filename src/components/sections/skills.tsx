import { Layers } from "lucide-react";

import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { stickerByKey } from "@/data/sticker-assets";
import type { StickerKey } from "@/data/skill-stickers";

function SkillPill({ name, stickerKey }: { name: string; stickerKey?: StickerKey }) {
  const stickerSrc = stickerKey ? stickerByKey[stickerKey] : undefined;

  return (
    <li className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground">
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

export function Skills() {
  return (
    <Section
      id="habilidades"
      icon={<Layers className="h-4 w-4" />}
      title="Habilidades"
      subtitle="Stack e competências que aplico no dia a dia — alinhadas ao meu perfil profissional."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {profile.skillCategories.map((category) => (
          <article
            key={category.id}
            className="rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-foreground/20"
          >
            <h3 className="text-sm font-medium text-foreground">{category.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillPill key={skill.name} name={skill.name} stickerKey={skill.stickerKey} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
