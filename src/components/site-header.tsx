import { Menu } from "lucide-react";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { resolveContacts } from "@/lib/contacts";

function AvailabilityBadge({ long = false }: { long?: boolean }) {
  if (!profile.available) return null;

  return (
    <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
      <span className="availability-dot h-1.5 w-1.5 rounded-full bg-brand" />
      {long ? "Disponível para projetos" : "Disponível"}
    </span>
  );
}

export function SiteHeader() {
  const whatsapp = resolveContacts(profile.contacts).find((contact) => contact.icon === "whatsapp");

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
          {/* CTA sempre à vista, para o contato não depender de rolar até o
              fim da página. Tratamento discreto de propósito: quem grita é o
              botão flutuante; aqui um pill verde sólido destoa de um header
              monocromático e parece anúncio colado por cima. */}
          {whatsapp && (
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 rounded-lg border border-brand/25 bg-brand/10 px-3.5 py-2 text-sm font-medium text-brand transition-colors hover:border-brand/40 hover:bg-brand/15 sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar comigo
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

              <div className="mt-6 space-y-4 border-t border-border pt-5">
                <AvailabilityBadge long />
                {whatsapp && (
                  <a
                    href={whatsapp.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Chamar no WhatsApp
                  </a>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
