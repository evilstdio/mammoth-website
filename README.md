# Mammoth website

Astro + TypeScript website for the Mammoth programming language, published with GitHub Pages at <https://evilstdio.github.io/mammoth-website/>. Every push to `main` deploys through `.github/workflows/deploy.yml`.

The landing page is an ice age descent: the Mammoth mascot stands in a glacial landscape, code examples sit in the ice, the JVM is the bedrock, and the page ends in a cave. Brand assets are in `public/brand/`.

## Pages

| Page | Source | Content |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Landing page |
| `/install/` | `src/pages/install/index.astro` | Windows installer, first program, VS Code, building from source |
| `/tour/` | `src/pages/tour/index.astro` | Eight-stop language tour |
| `/docs/` | `src/pages/docs/[...slug].astro` | Documentation generated from the compiler README |
| `/examples/` | `src/pages/examples/index.astro` | Example gallery and `.mam` downloads |

All pages share `src/layouts/Base.astro` (header, footer, copy buttons). Release facts such as the version and download links live in `src/site.ts`; update them when a new compiler version ships.

The eight example programs and their expected output live in `src/data/examples.ts`. All eight were compiled and run with `java -Xverify:all`, with matching output. Outputs are presented as expected output, not a browser compiler.

## Documentation

The docs are generated from the compiler repository's README, one page per `##` section:

```sh
npm run sync-docs              # reads ../mammoth
npm run sync-docs -- <path>    # reads another compiler checkout
```

This rewrites `src/content/docs/` and refreshes Mammoth syntax colouring in `src/shiki/grammar.mjs` from the VS Code extension's grammar. Review the diff and commit it. Sidebar groups are set at the top of `scripts/sync-docs.mjs`; a new README section lands under "More" until you place it. The README's License section is left out on purpose.

## Development

```sh
npm install
npm run dev
```

The site is served under `/mammoth-website/`, so open <http://localhost:4321/mammoth-website/> locally. Build links with `url()` from `src/site.ts` rather than starting them with `/`.

## Build

```sh
npm run build
npm run preview
```

The static site is generated in `dist/`. Fonts are served locally. There are no accounts, analytics, external assets, or backend services.
