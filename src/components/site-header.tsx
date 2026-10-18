import { Github, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { resolveContacts } from "@/lib/contacts";

export function SiteHeader() {
  const github = resolveContacts(profile.contacts).find((contact) => contact.icon === "github");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-(--site-header-height) max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <a
          href="#sobre"
          className="shrink-0 font-mono text-[11px] tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:text-xs"
        >
          GV · SOLUÇÕES DIGITAIS
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Seções do site">
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
          {/* Só o glifo, sem caixa: o header é texto mono puro, e qualquer
              botão com fundo ou borda neste espaço destoa. */}
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="hidden text-muted-foreground transition-colors hover:text-brand sm:block"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[270px] border-l border-border bg-background px-5 py-6"
            >
              <nav className="mt-8 flex flex-col gap-1" aria-label="Menu de seções">
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

              {github && (
                <div className="mt-6 border-t border-border pt-5">
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
