# Gabriel Victorino — Portfolio

Portfolio pessoal da **GV Soluções Digitais**, construído com TanStack Start, React 19,
Tailwind CSS 4 e shadcn/ui. Site de página única, pré-renderizado como HTML estático e
publicado em **Cloudflare Workers** (static assets) em
[gvsolucoesdigitais.com](https://gvsolucoesdigitais.com) — o `www` redireciona para o apex.

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

## Endereços

| Endereço | O que é | Quando muda |
| --- | --- | --- |
| `gvsolucoesdigitais.com` | **produção** | merge na `main` |
| `www.gvsolucoesdigitais.com` | redirect 301 para o apex | — |
| `dev-portfolio.gavictorino97.workers.dev` | **homologação** | push na `dev` |
| `<id>-portfolio.gavictorino97.workers.dev` | uma versão específica, imutável | nunca |
| `portfolio.gavictorino97.workers.dev` | **desativado** (`workers_dev: false`) | — |

O último merece atenção porque o nome engana: `<worker>.<sub>.workers.dev` é a rota de **produção**
do Worker, derivada do nome dele. Não dá para apontá-la para uma versão de `dev` — quem faz esse
papel é o `dev-portfolio.…`, que é o endereço de homologação do dia a dia.

## Deploy

Quem builda e publica é o **Cloudflare Workers Builds**, conectado ao repositório pelo painel da
Cloudflare — não há passo de deploy no GitHub.

São duas branches, e nada vai para produção sem passar por revisão:

| Branch | O que acontece no push                                    | Onde aparece                              |
| ------ | --------------------------------------------------------- | ----------------------------------------- |
| `dev`  | build de preview: sobe a versão **sem** receber tráfego    | `dev-portfolio.gavictorino97.workers.dev` |
| `main` | build de produção: `wrangler deploy`                       | `gvsolucoesdigitais.com`                  |

O dia a dia é: trabalhar na `dev`, conferir na URL de preview, abrir PR para a `main` e **só publicar
ao dar merge**. O merge é o portão de aprovação — nada chega ao domínio sozinho.

```
commit na dev ──► preview build ──► URL de versão (você confere)
                                          │
                              PR dev → main (checks do GitHub)
                                          │
                                    merge ──► produção
```

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda os **mesmos** portões em
paralelo, para aparecerem como check no GitHub e barrarem o merge do PR. Ele não publica nada.

> Só um dos dois pode publicar. Se um dia voltar o deploy pelo GitHub Actions, **desconecte a
> integração Git no painel da Cloudflare** antes — com os dois ativos, cada push dispara dois
> deploys concorrentes.

### Configuração no painel da Cloudflare

Workers & Pages → o Worker → **Settings → Build**:

| Campo                  | Valor                              |
| ---------------------- | ---------------------------------- |
| Build command          | `bun run verify && bun run build`  |
| Deploy command         | `npx wrangler deploy`              |
| Preview command        | deixe o padrão (`npx wrangler preview`) |
| Root directory         | `/` (padrão)                       |
| Build variable         | `BUN_VERSION` = `1.3.13`           |

Em **Branch control**: production branch = `main`, e **Enable Preview Builds** ligado.

`bun run verify` é lint + typecheck + testes. Está no build command de propósito: assim um teste
vermelho **falha o build e não publica** — vale tanto para preview quanto para produção. O
`BUN_VERSION` é necessário porque o build image vem com bun 1.2.15 por padrão e o `bun.lock` deste
repo é gerado por 1.3.13.

O `preview_urls: true` no `wrangler.jsonc` é o que dá URL própria a cada versão de preview. Sem ele
o build de preview sobe a versão, mas não há onde olhar o resultado.

O bloco **`"previews": {}`** no `wrangler.jsonc` é obrigatório para o `npx wrangler preview`, que é o
preview command padrão do Workers Builds. Sem ele o build de preview falha com
`configuration is missing a 'previews' block` — e o sintoma engana, porque o build command passa
inteiro (lint, testes, vite build, prerender) e só o deploy quebra, parecendo erro de build.

Vazio é válido: o bloco só precisa de conteúdo se o preview tiver settings próprios, como variáveis
ou bindings apontando para recursos de teste. Aqui não tem — o site é estático e não usa binding.

O endereço do preview é **estável por branch**: a `dev` sempre cai em
`dev-portfolio.gavictorino97.workers.dev`, sem precisar caçar a URL no log a cada build.

> Preview **nunca** altera o endereço de produção: é esse o ponto. Se você publicou na `dev` e foi
> conferir na URL de produção, o correto é justamente não ver mudança nenhuma.

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

Registrado na **Squarespace** (herdado do Google Domains), com DNS na **Cloudflare** — o registrador
continua sendo a Squarespace, só os nameservers apontam para cá. Migração concluída.

Como está montado:

| Endereço | O que é |
| --- | --- |
| `gvsolucoesdigitais.com` | **único endereço de produção** — Custom Domain do Worker |
| `www.gvsolucoesdigitais.com` | redirect 301 para o apex, preservando caminho e query |
| `portfolio.<sub>.workers.dev` | **desativado** (`workers_dev: false`) |

O `workers.dev` de produção fica desligado para o site não responder em dois endereços públicos com
conteúdo idêntico. Precisa estar no `wrangler.jsonc`, não só no painel: desligado apenas pelo
dashboard, o próximo `wrangler deploy` religa a rota. Preview URLs são independentes dessa chave,
então `dev-portfolio.<sub>.workers.dev` continua funcionando.

O `www` **não** é Custom Domain: o diálogo de Custom Domain do Worker só aceita nome de zona, não
subdomínio. Ele existe como um registro `AAAA` proxiado para `100::` (endereço de descarte) mais uma
Redirect Rule que intercepta antes de tentar qualquer origem.

Ter só um endereço servindo conteúdo é melhor que dois: evita dividir sinal de SEO entre `www` e
apex. Por isso `siteUrl` em `src/data/profile.ts`, o `sitemap.xml` e o `robots.txt` apontam todos
para o apex — se um dia isso inverter, os três precisam mudar junto.

**Não mexa nestes registros** — são o e-mail (Google Workspace):

| Tipo | Nome | Valor |
| --- | --- | --- |
| MX | `@` | `smtp.google.com` (prioridade 1) |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `google._domainkey` | DKIM |

Para verificar a zona de fora sem depender de cache de resolver (útil em qualquer mudança de DNS):

```bash
# estado real da delegação e do DNSSEC, direto do registro .com
curl -s "https://rdap.verisign.com/com/v1/domain/gvsolucoesdigitais.com"

# conteúdo da zona, perguntando ao autoritativo da Cloudflare
node -e "const {Resolver}=require('node:dns').promises;const r=new Resolver();
r.setServers(['108.162.195.211']);r.resolveMx('gvsolucoesdigitais.com').then(console.log)"
```
