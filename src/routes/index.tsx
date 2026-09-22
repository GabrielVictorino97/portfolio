import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Briefcase, ChevronLeft, ChevronRight, Github, Layers, Linkedin, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import gabrielPhoto from "@/assets/gabriel.png";
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
import { FloatingSkillStickers } from "@/components/floating-skill-stickers";
import { profile } from "@/data/profile";
import type { StickerKey } from "@/data/skill-stickers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gabriel Victorino — GV Soluções Digitais" },
      {
        name: "description",
        content:
          "Gabriel Victorino — Tech Lead e fundador da GV Soluções Digitais. Especialista em C#, .NET Core, Python, microserviços e arquitetura de software.",
      },
      { property: "og:title", content: "Gabriel Victorino — GV Soluções Digitais" },
      {
        property: "og:description",
        content:
          "Vitrine de habilidades: backend, arquitetura, DevOps e liderança técnica. 8+ anos de experiência.",
      },
    ],
  }),
  component: Index,
});

const stickerByKey: Record<StickerKey, string> = {
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

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <SiteHeader />
      <FloatingSkillStickers />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <section id="sobre" className="scroll-mt-[4rem] pt-10 sm:scroll-mt-[5.5rem] sm:pt-12">
          <div className="relative mx-auto w-fit sm:mx-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/10 to-white/0 blur-sm" />
            <img
              src={gabrielPhoto}
              alt="Gabriel Victorino"
              width={160}
              height={160}
              className="relative h-32 w-32 rounded-full border border-border object-cover shadow-[0_8px_30px_rgba(0,0,0,0.6)] sm:h-36 sm:w-36"
            />
          </div>

          <p className="mt-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground sm:text-left">
            Olá, eu sou
          </p>
          <h1 className="mt-3 text-center text-3xl font-medium tracking-tight sm:text-left sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-center font-mono text-sm text-muted-foreground sm:text-left">
            {profile.headline}
          </p>
          <p className="mt-1 text-center text-sm text-muted-foreground sm:text-left">
            {profile.company} · {profile.location}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:mx-0 sm:text-left sm:text-lg">
            {profile.bio}
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {profile.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-card/50 px-3 py-4 text-center backdrop-blur-sm sm:px-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground sm:text-base">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <ConnectSection />

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

        <Section
          id="experiencia"
          icon={<Briefcase className="h-4 w-4" />}
          title="Experiência"
          subtitle={`Trajetória de ${profile.experienceYears} em desenvolvimento de software.`}
        >
          <ol className="relative space-y-0 border-l border-border pl-6">
            {profile.companyGroups.map((group) => {
              const isCurrent = group.roles.some((r) => r.current);
              const duration = computeCompanyDuration(group.roles);

              return (
                <li key={group.company} className="relative pb-10 last:pb-0">
                  <span
                    className={`absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-background ${
                      isCurrent ? "bg-emerald-400" : "bg-muted-foreground/50"
                    }`}
                  />
                  {/* Company header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-medium text-foreground">{group.company}</h3>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground sm:text-xs">
                      {duration}
                    </span>
                  </div>
                  {group.location && (
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">{group.location}</p>
                  )}

                  {/* Roles within company */}
                  <div className="mt-3 space-y-4">
                    {group.roles.map((role) => (
                      <div
                        key={role.role}
                        className="rounded-lg border border-border/50 bg-background/40 px-4 py-3"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-sm font-medium text-foreground/90">{role.role}</h4>
                          <span className="font-mono text-[10px] text-muted-foreground sm:text-xs">
                            {role.period}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {role.highlights.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </Section>

        <Section
          id="certificacoes"
          icon={<Award className="h-4 w-4" />}
          title="Certificações"
          subtitle="Formação contínua em arquitetura, .NET e boas práticas."
        >
          <CertificationCarousel />
        </Section>

        <footer className="mt-14 flex items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground sm:mt-20 sm:pt-8">
          <span>
            © {new Date().getFullYear()} {profile.founder}
          </span>
          <span className="font-mono">v2.0</span>
        </footer>
      </div>
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#sobre"
          className="shrink-0 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:text-xs"
        >
          GV · SOLUÇÕES DIGITAIS
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 sm:flex" aria-label="Seções do site">
          {profile.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden shrink-0 items-center gap-2 text-xs text-muted-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            Disponível
          </span>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] border-l border-border bg-background px-5 py-6">
              <nav className="mt-8 flex flex-col gap-1" aria-label="Menu mobile">
                {profile.nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-md px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t border-border pt-5">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  Disponível para projetos
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function ConnectSection() {
  return (
    <section id="contato" className="scroll-mt-[4rem] pt-12 sm:scroll-mt-[5.5rem] sm:pt-14">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Conecte-se</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Vamos conversar sobre projetos, oportunidades ou troca técnica.
      </p>
      <div className="mt-6 flex flex-col divide-y divide-border rounded-xl border border-border bg-card/50 shadow-[0_0_40px_rgba(0,0,0,0.15)] backdrop-blur-sm">
        <ProfileLink
          href="https://github.com/GabrielVictorino97"
          label="GitHub"
          handle="@GabrielVictorino97"
          icon={<Github className="h-4 w-4" />}
        />
        <ProfileLink
          href="https://www.linkedin.com/in/gabriel-victorino/"
          label="LinkedIn"
          handle="gabriel-victorino"
          icon={<Linkedin className="h-4 w-4" />}
        />
      </div>
    </section>
  );
}

function Section({
  id,
  icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[4rem] pt-14 sm:scroll-mt-[5.5rem] sm:pt-20">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h2>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function SkillPill({ name, stickerKey }: { name: string; stickerKey?: StickerKey }) {
  const stickerSrc = stickerKey ? stickerByKey[stickerKey] : undefined;

  return (
    <li className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground">
      {stickerSrc && (
        <img
          src={stickerSrc}
          alt=""
          aria-hidden
          className="h-4 w-4 object-contain"
          width={16}
          height={16}
        />
      )}
      {name}
    </li>
  );
}

function ProfileLink({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-accent/40"
    >
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
          {icon}
        </span>
        <span className="text-sm text-foreground">{label}</span>
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">{handle}</span>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

const PT_MONTHS: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
};

function parseMonthYear(text: string): Date {
  const [mes, ano] = text.toLowerCase().trim().split(" ");
  return new Date(Number(ano), PT_MONTHS[mes] ?? 0, 1);
}

function formatDuration(startStr: string, endStr: string): string {
  const start = parseMonthYear(startStr);
  const end = endStr === "Atual" ? new Date() : parseMonthYear(endStr);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Include the end month in the count
  months += 1;
  if (months === 12) {
    years += 1;
    months = 0;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  return parts.join(" e ");
}

function computeCompanyDuration(roles: { period: string }[]): string {
  const periods = roles.map((r) => r.period);
  const startParts = periods.map((p) => p.split(" — ")[0]);
  const endParts = periods.map((p) => p.split(" — ")[1]);
  const overallStart = startParts[startParts.length - 1];
  const overallEnd = endParts.includes("Atual") ? "Atual" : endParts[0];
  return formatDuration(overallStart, overallEnd);
}

function CertificationCarousel() {
  const certs = profile.certifications;
  const perPage = 4;
  const totalPages = Math.ceil(certs.length / perPage);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setPage((prev) => (prev + 1) % totalPages);
      }
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalPages]);

  const goTo = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const prev = useCallback(() => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const next = useCallback(() => {
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  // Build pages: each page is an array of 4 certs
  const pages = Array.from({ length: totalPages }, (_, i) =>
    certs.slice(i * perPage, i * perPage + perPage),
  );

  if (certs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Nenhuma certificação cadastrada.</p>
    );
  }

  return (
    <div
      className="relative rounded-xl border border-border bg-card/40 backdrop-blur-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Viewport */}
      <div className="overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageCerts, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full shrink-0 grid-cols-1 gap-3 sm:grid-cols-2"
              aria-hidden={pageIndex !== page}
            >
              {pageCerts.map((cert) => (
                <div
                  key={cert.title}
                  className="flex h-[90px] flex-col items-center justify-center rounded-lg border border-border/60 bg-background/50 px-3 text-center sm:h-[88px] sm:px-4"
                >
                  <p className="line-clamp-2 text-xs font-medium text-foreground sm:text-sm">{cert.title}</p>
                  <p className="mt-1 shrink-0 font-mono text-[10px] text-muted-foreground sm:text-xs">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground/60 transition-colors hover:text-foreground sm:left-2"
            aria-label="Certificações anteriores"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground/60 transition-colors hover:text-foreground sm:right-2"
            aria-label="Próximas certificações"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pb-4" role="tablist" aria-label="Páginas de certificações">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              role="tab"
              aria-selected={index === page}
              aria-label={`Página ${index + 1} de ${totalPages}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === page ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
