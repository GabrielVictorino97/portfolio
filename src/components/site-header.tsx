import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { profile } from "@/data/profile";

function AvailabilityBadge({ long = false }: { long?: boolean }) {
  if (!profile.available) return null;

  return (
    <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
      {long ? "Disponível para projetos" : "Disponível"}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-(--site-header-height) max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <a
          href="#sobre"
          className="shrink-0 font-mono text-[11px] tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:text-xs"
        >
          GV · SOLUÇÕES DIGITAIS .
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
          <div className="hidden sm:flex">
            <AvailabilityBadge />
          </div>

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
              className="w-[260px] border-l border-border bg-background px-5 py-6"
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
              <div className="mt-6 border-t border-border pt-5">
                <AvailabilityBadge long />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
