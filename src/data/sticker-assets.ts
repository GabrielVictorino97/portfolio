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

import type { StickerKey } from "./skill-stickers";

/** Fonte única dos arquivos de sticker — consumida pelas pills e pelos ícones flutuantes. */
export const stickerByKey: Record<StickerKey, string> = {
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
