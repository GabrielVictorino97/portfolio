export type StickerKey =
  | "csharp"
  | "dotnet"
  | "python"
  | "typescript"
  | "angular"
  | "docker"
  | "kubernetes"
  | "postgres"
  | "mongodb"
  | "redis"
  | "sqlserver"
  | "rabbitmq"
  | "git";

export type FloatingStickerLayout = {
  key: StickerKey;
  name: string;
  side: "left" | "right";
  /** Posição vertical na coluna lateral */
  position: string;
  rotation: string;
  size: string;
  motion: "a" | "b" | "c" | "d";
};

/** Ícones nas laterais do hero — alinhados às habilidades do profile. */
export const floatingStickerLayout: FloatingStickerLayout[] = [
  {
    key: "csharp",
    name: "C#",
    side: "left",
    position: "top-[8%]",
    rotation: "-rotate-12",
    size: "h-14 w-14 lg:h-[4.5rem] lg:w-[4.5rem]",
    motion: "a",
  },
  {
    key: "python",
    name: "Python",
    side: "left",
    position: "top-[26%]",
    rotation: "rotate-[8deg]",
    size: "h-12 w-12 lg:h-16 lg:w-16",
    motion: "c",
  },
  {
    key: "angular",
    name: "Angular",
    side: "left",
    position: "top-[44%]",
    rotation: "-rotate-[6deg]",
    size: "h-12 w-12 lg:h-[4rem] lg:w-[4rem]",
    motion: "b",
  },
  {
    key: "kubernetes",
    name: "Kubernetes",
    side: "left",
    position: "top-[58%]",
    rotation: "rotate-[14deg]",
    size: "h-12 w-12 lg:h-16 lg:w-16",
    motion: "d",
  },
  {
    key: "postgres",
    name: "PostgreSQL",
    side: "left",
    position: "top-[72%]",
    rotation: "-rotate-[6deg]",
    size: "h-11 w-11 lg:h-14 lg:w-14",
    motion: "a",
  },
  {
    key: "sqlserver",
    name: "SQL Server",
    side: "left",
    position: "top-[86%]",
    rotation: "rotate-[6deg]",
    size: "h-11 w-11 lg:h-14 lg:w-14",
    motion: "c",
  },
  {
    key: "dotnet",
    name: ".NET Core",
    side: "right",
    position: "top-[8%]",
    rotation: "rotate-[10deg]",
    size: "h-14 w-14 lg:h-[4.5rem] lg:w-[4.5rem]",
    motion: "b",
  },
  {
    key: "typescript",
    name: "TypeScript",
    side: "right",
    position: "top-[26%]",
    rotation: "-rotate-[8deg]",
    size: "h-12 w-12 lg:h-16 lg:w-16",
    motion: "d",
  },
  {
    key: "docker",
    name: "Docker",
    side: "right",
    position: "top-[44%]",
    rotation: "rotate-[12deg]",
    size: "h-12 w-12 lg:h-[4rem] lg:w-[4rem]",
    motion: "a",
  },
  {
    key: "redis",
    name: "Redis",
    side: "right",
    position: "top-[58%]",
    rotation: "-rotate-[10deg]",
    size: "h-11 w-11 lg:h-14 lg:w-14",
    motion: "c",
  },
  {
    key: "mongodb",
    name: "MongoDB",
    side: "right",
    position: "top-[72%]",
    rotation: "rotate-[12deg]",
    size: "h-11 w-11 lg:h-14 lg:w-14",
    motion: "b",
  },
  {
    key: "rabbitmq",
    name: "RabbitMQ",
    side: "right",
    position: "top-[86%]",
    rotation: "-rotate-[8deg]",
    size: "h-11 w-11 lg:h-14 lg:w-14",
    motion: "d",
  },
  {
    key: "git",
    name: "Git",
    side: "left",
    position: "top-[94%]",
    rotation: "rotate-[16deg]",
    size: "h-10 w-10 lg:h-12 lg:w-12",
    motion: "a",
  },
];
