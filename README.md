# Gabriel Victorino — Portfolio

Portfolio pessoal da **GV Soluções Digitais**, construído com TanStack Start, React 19, Tailwind CSS 4 e shadcn/ui.

## Pré-requisitos

- [Bun](https://bun.sh/) instalado (recomendado)

## Iniciar localmente

Na raiz do projeto:

```bash
# 1. Instalar dependências
bun install

# 2. Subir o servidor de desenvolvimento
bun run dev
```

**PowerShell (Windows):**

```powershell
bun install
bun run dev
```

Abra no navegador: [http://localhost:8080](http://localhost:8080)

Para encerrar o servidor, use `Ctrl + C` no terminal.

### Outros comandos úteis

```bash
# Visualizar o build de produção localmente
bun run build
bun run preview

# Verificar lint e formatar código
bun run lint
bun run format
```

## Build

| Comando               | Uso                                                    |
| --------------------- | ------------------------------------------------------ |
| `bun run build`       | Build padrão (Cloudflare Workers / SSR)                |
| `bun run build:pages` | Build estático para GitHub Pages (`GITHUB_PAGES=true`) |

Para simular o build de produção do GitHub Pages localmente:

```bash
# PowerShell
$env:GITHUB_PAGES = "true"
$env:GITHUB_REPOSITORY = "GabrielVictorino97/gabrielvictorino-portfolio"
bun run build:pages
bun run preview
```

## Deploy no GitHub Pages

O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publica automaticamente o site a cada push na branch `main`.

### Ativar no repositório

1. Envie o código para o GitHub (branch `main`).
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como fonte.
3. Após o workflow concluir, o site ficará em:

   `https://<usuario>.github.io/<repositorio>/`

   Exemplo: `https://gabrielvictorino97.github.io/gabrielvictorino-portfolio/`

### Como funciona

- O build usa **prerender estático** do TanStack Start (`dist/client`).
- O `base` do Vite é definido automaticamente a partir de `GITHUB_REPOSITORY`.
- O plugin Cloudflare é desativado nesse build para compatibilidade com hospedagem estática.
- Um `404.html` (cópia do `index.html`) garante fallback para rotas futuras do SPA.
