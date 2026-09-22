import stickerAngular from "@/assets/sticker-angular.png";
import stickerCsharp from "@/assets/sticker-csharp.png";
import stickerDocker from "@/assets/sticker-docker.png";
import stickerDotnet from "@/assets/sticker-dotnet.png";
import stickerGit from "@/assets/sticker-git.png";
import stickerKubernetes from "@/assets/sticker-kubernetes.svg";
import stickerMongodb from "@/assets/sticker-mongodb.png";
import stickerPostgres from "@/assets/sticker-postgres.png";
import stickerPython from "@/assets/sticker-python.png";
import stickerRabbitmq from "@/assets/sticker-rabbitmq.png";
import stickerRedis from "@/assets/sticker-redis.png";
import stickerSqlserver from "@/assets/sticker-sqlserver.png";
import stickerTypescript from "@/assets/sticker-typescript.png";
import { floatingStickerLayout, type FloatingStickerLayout, type StickerKey } from "@/data/skill-stickers";

const stickerSrcByKey: Record<StickerKey, string> = {
  csharp: stickerCsharp,
  dotnet: stickerDotnet,
  python: stickerPython,
  typescript: stickerTypescript,
  angular: stickerAngular,
  kubernetes: stickerKubernetes,
  docker: stickerDocker,
  redis: stickerRedis,
  postgres: stickerPostgres,
  mongodb: stickerMongodb,
  rabbitmq: stickerRabbitmq,
  git: stickerGit,
  sqlserver: stickerSqlserver,
};

const motionClass: Record<FloatingStickerLayout["motion"], string> = {
  a: "skill-sticker-motion-a",
  b: "skill-sticker-motion-b",
  c: "skill-sticker-motion-c",
  d: "skill-sticker-motion-d",
};

const leftStickers = floatingStickerLayout.filter((s) => s.side === "left");
const rightStickers = floatingStickerLayout.filter((s) => s.side === "right");

function StickerFigure({ item }: { item: FloatingStickerLayout }) {
  return (
    <figure
      title={item.name}
      className={`skill-sticker absolute ${item.position} ${item.size} ${motionClass[item.motion]}`}
    >
      <div className={`h-full w-full ${item.rotation}`}>
        <img
          src={stickerSrcByKey[item.key]}
          alt=""
          width={512}
          height={512}
          className="h-full w-full object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
          draggable={false}
        />
      </div>
    </figure>
  );
}

export function FloatingSkillStickers() {
  return (
    <div className="hero-stickers-layer hidden lg:block" aria-hidden>
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
