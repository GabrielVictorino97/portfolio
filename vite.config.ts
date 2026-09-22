// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Alvo de deploy: Cloudflare Workers com static assets (ver wrangler.jsonc),
// servindo o domínio custom da raiz — daí `base: "/"`.
//
// O site é pré-renderizado e publicado como arquivos estáticos: o Worker não
// tem script, só serve `dist/client`. Por isso o prerender fica ligado e o
// bundle SSR do preset fica desligado logo abaixo.
export default defineConfig({
  // Este `cloudflare` é o bundle SSR da Cloudflare embutido no preset da
  // Lovable — coisa diferente do deploy configurado em wrangler.jsonc. O
  // layout de saída dele quebra o prerender estático, então fica desligado.
  // A opção mudou de nome em versões posteriores do preset (`cloudflare` →
  // `nitro`), por isso a dependência é fixada em 1.7.0 no package.json: com
  // `^`, um minor novo transformaria isto numa chave silenciosamente ignorada.
  cloudflare: false,
  tanstackStart: {
    prerender: { enabled: true },
  },
  vite: {
    base: "/",
  },
});
