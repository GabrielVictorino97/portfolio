# Gabriel Victorino — Portfolio

Portfolio pessoal da **GV Soluções Digitais**, construído com TanStack Start, React 19,
Tailwind CSS 4 e shadcn/ui. Site de página única, pré-renderizado como HTML estático e
publicado em **Cloudflare Workers** (static assets) em
[www.gvsolucoesdigitais.com](https://www.gvsolucoesdigitais.com).

## Pré-requisitos

- [Bun](https://bun.sh/) instalado

## Iniciar localmente

```bash
bun install
bun run dev
```

Abra [http://localhost:8080](http://localhost:8080). `Ctrl + C` encerra o servidor.

## Comandos

| Comando                  | O que faz                                                |
| ------------------------ | -------------------------------------------------------- |
| `bun run dev`            | Servidor de desenvolvimento                              |
| `bun run build`          | Build de produção (estático, com prerender)              |
| `bun run preview`        | Serve o build de produção localmente                     |
| `bun run lint`           | ESLint + Prettier                                        |
| `bun run typecheck`      | `tsc --noEmit`                                           |
| `bun run test`           | Vitest (uma vez)                                         |
| `bun run test:watch`     | Vitest em modo watch                                     |
| `bun run format`         | Aplica o Prettier                                        |
| `bun run assets:optimize`| Reduz as imagens de `src/assets` ao tamanho de exibição  |
| `bun run assets:brand`   | Regera `og-image.png` e `apple-touch-icon.png`           |
| `bun run verify`         | lint + typecheck + testes (o mesmo que a Cloudflare roda)|
| `bun run deploy`         | `wrangler deploy` manual (normalmente a Cloudflare faz)  |

## Onde mexer no conteúdo

Quase tudo que aparece no site vem de **`src/data/profile.ts`**: bio, contatos, projetos,
habilidades, experiência, certificações e navegação. As seções em `src/components/sections/`
só renderizam esses dados.

Dois pontos merecem atenção:

- **WhatsApp** — está desligado. Preencha `handle` do contato `whatsapp` com o número em
  formato internacional só com dígitos (ex.: `"5516999998888"`); o link `wa.me` e a máscara
  de exibição são derivados daí. Enquanto estiver vazio, o contato simplesmente não é
  renderizado, para nunca existir link morto.
- **Tempo de experiência** — não é digitado em lugar nenhum. Sai de `careerStart` via
  `src/lib/duration.ts`, então nunca envelhece nem diverge entre a página e as meta tags.

## Imagens

O ambiente de desenvolvimento não precisa de ImageMagick nem `sharp`: os scripts em
`scripts/` leem e escrevem PNG usando só `node:zlib`.

- `scripts/optimize-assets.mjs` reduz foto e stickers ao tamanho em que são realmente
  exibidos (é idempotente — rodar de novo não degrada nada).
- `scripts/generate-brand-assets.mjs` desenha o cartão de compartilhamento e o ícone a
  partir da foto e dos textos no topo do arquivo. Rode de novo se a foto ou o headline mudarem.

Se trocar `src/assets/gabriel.png` por uma foto nova em alta, rode os dois na ordem:

```bash
bun run assets:optimize
bun run assets:brand
```

## Deploy

Todo push na `main` publica o site. Quem builda e publica é o **Cloudflare Workers Builds**,
conectado ao repositório pelo painel da Cloudflare — não há passo de deploy no GitHub.

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda os **mesmos** portões em
paralelo, só para aparecerem como check no GitHub (útil em pull request). Ele não publica nada.

> Só um dos dois pode publicar. Se um dia voltar o deploy pelo GitHub Actions, **desconecte a
> integração Git no painel da Cloudflare** antes — com os dois ativos, cada push dispara dois
> deploys concorrentes.

### Configuração no painel da Cloudflare

Workers & Pages → o Worker → **Settings → Build**:

| Campo                  | Valor                              |
| ---------------------- | ---------------------------------- |
| Build command          | `bun run verify && bun run build`  |
| Deploy command         | `npx wrangler deploy`              |
| Root directory         | `/` (padrão)                       |
| Build variable         | `BUN_VERSION` = `1.3.13`           |

`bun run verify` é lint + typecheck + testes. Está no build command de propósito: assim um teste
vermelho **falha o build e não publica**. O `BUN_VERSION` é necessário porque o build image vem com
bun 1.2.15 por padrão e o `bun.lock` deste repo é gerado por 1.3.13.

O nome em `wrangler.jsonc` precisa ser **idêntico** ao nome do Worker no painel — `wrangler deploy`
publica para o nome do arquivo, não para o Worker que o painel conectou. Se divergirem, nasce um
segundo Worker e o conectado fica vazio.

### Como funciona

- Build com **prerender estático** do TanStack Start; o que vai para a Cloudflare é `dist/client`.
- O Worker **não tem script** (`wrangler.jsonc` não define `main`): só serve arquivos estáticos.
- `not_found_handling: "404-page"` faz caminho desconhecido devolver **404 de verdade** com a
  `public/404.html`, em vez de 200 com o index (soft 404, ruim para busca).
- `cloudflare: false` no `vite.config.ts` desliga o bundle SSR embutido no preset da Lovable —
  coisa diferente deste deploy; o layout de saída dele quebraria o prerender.

Nenhum secret é necessário no GitHub: a Cloudflare se autentica sozinha pela integração Git.

### Domínio

O domínio é registrado na **Squarespace** (herdado do Google Domains). Para o Worker aceitar o
domínio custom, a **zona precisa estar na Cloudflare** — ou seja, os nameservers têm que apontar
para lá. O registrador continua sendo a Squarespace; só o DNS muda.

1. Cloudflare → **Add a site** → `gvsolucoesdigitais.com` → plano Free.
2. Conferir os registros importados (e-mail em especial: MX, SPF, DKIM). **Antes de trocar os
   nameservers**, compare com o painel de DNS da Squarespace e recrie na mão o que faltar —
   a importação automática costuma perder algum registro.
3. Se houver DNSSEC ativo na Squarespace, **desligue primeiro**: trocar nameservers com DNSSEC
   ligado derruba o domínio até a propagação terminar.
4. Na Squarespace, substituir os nameservers pelos dois que a Cloudflare mostrar.
5. Esperar a zona ficar **Active** na Cloudflare (minutos a algumas horas).
6. Workers & Pages → `gabrielvictorino-portfolio` → **Settings → Domains & Routes → Add custom
   domain** → `www.gvsolucoesdigitais.com`. A Cloudflare cria o DNS e emite o certificado sozinha.
7. Para o apex responder também, adicionar `gvsolucoesdigitais.com` como custom domain, ou criar
   uma Redirect Rule do apex para `www`.
