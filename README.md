# Mammoth website

Local-first Astro + TypeScript landing page for the Mammoth programming language. Content is grounded in the compiler project's README and handoff as of November 10, 2026. No remote or deployment has been created.

The design is an ice age descent: the supplied Mammoth SVG mascot stands in a glacial landscape, code examples sit in the ice, the JVM is the bedrock, and the page ends in a cave. Brand assets are in `public/brand/`.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The static site is generated in `dist/`. Fonts are served locally. There are no accounts, analytics, external assets, or backend services.

The landing page includes eight keyboard-accessible code examples: greeting, functions, collections, null safety, classes, branching, Java interop, and JSON. Each includes clipboard copying and a matching `.mam` download. The code and expected output live in `src/data/examples.ts`; Astro generates downloads from the same source. All eight were compiled and run with `java -Xverify:all`, with matching output. Outputs are presented as expected output, not a browser compiler.

Full documentation with Starlight and prebuilt compiler downloads are future work. The current landing page links to its own language overview, examples, and setup sections.
