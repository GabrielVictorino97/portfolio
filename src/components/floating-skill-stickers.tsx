import { floatingStickerLayout, type FloatingStickerLayout } from "@/data/skill-stickers";
import { stickerByKey } from "@/data/sticker-assets";
import { useMediaQuery } from "@/hooks/use-media-query";

const motionClass: Record<FloatingStickerLayout["motion"], string> = {
  a: "skill-sticker-motion-a",
  b: "skill-sticker-motion-b",
  c: "skill-sticker-motion-c",
  d: "skill-sticker-motion-d",
};

const leftStickers = floatingStickerLayout.filter((sticker) => sticker.side === "left");
const rightStickers = floatingStickerLayout.filter((sticker) => sticker.side === "right");

function StickerFigure({ item }: { item: FloatingStickerLayout }) {
  return (
    <figure
      title={item.name}
      className={`skill-sticker absolute ${item.position} ${item.size} ${motionClass[item.motion]}`}
    >
      <div className={`h-full w-full ${item.rotation}`}>
        <img
          src={stickerByKey[item.key]}
          alt=""
          aria-hidden
          width={160}
          height={160}
          decoding="async"
          className="h-full w-full object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
          draggable={false}
        />
      </div>
    </figure>
  );
}

export function FloatingSkillStickers() {
  // Montagem condicional, não `hidden lg:block`: o browser baixa <img> mesmo
  // dentro de container com display:none, e no celular esses ícones nunca
  // aparecem — eram ~1 MB de download puramente desperdiçado.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (!isDesktop) return null;

  return (
    <div className="hero-stickers-layer" aria-hidden>
      <div className="hero-stickers-rail hero-stickers-rail--left">
        {leftStickers.map((item) => (
          <StickerFigure key={item.key} item={item} />
        ))}
      </div>
      <div className="hero-stickers-rail hero-stickers-rail--right">
        {rightStickers.map((item) => (
          <StickerFigure key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
