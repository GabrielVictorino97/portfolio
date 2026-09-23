import { createFileRoute } from "@tanstack/react-router";

import { FloatingContact } from "@/components/floating-contact";
import { SiteHeader } from "@/components/site-header";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader />
      <FloatingContact />

      <main id="conteudo" className="relative overflow-hidden bg-background text-foreground">
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-28 sm:px-6">
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <Certifications />
          <Contact />

          <footer className="mt-14 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-20 sm:pt-8">
            <span>
              © {new Date().getFullYear()} {profile.founder}
            </span>
            <span className="font-mono">{profile.location}</span>
          </footer>
        </div>
      </main>
    </>
  );
}
