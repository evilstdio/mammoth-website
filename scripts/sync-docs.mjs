// Turns the compiler's README into documentation pages for this site.
//
//   npm run sync-docs                  reads ../mammoth/README.md
//   npm run sync-docs -- <path>        reads <path>/README.md
//
// Each "## " section of the README becomes one page in src/content/docs/.
// Rerun this after the README changes, then review and commit the result.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const compilerDir = resolve(process.argv[2] ?? "../mammoth");
const outDir = resolve("src/content/docs");
const repoBlob = "https://github.com/evilstdio/Mammoth/blob/main/";

// Sidebar groups, in order. A README section not listed here lands in "More".
const groups = [
  ["Start here", ["Install", "VS Code"]],
  [
    "Basics",
    [
      "Values and conditions",
      "Mutable variables and loops",
      "Returning values",
      "Choosing with when",
      "Handling errors",
      "Dictionary literals",
    ],
  ],
  ["Functions", ["Generic functions", "Functions as values"]],
  ["Types and classes", ["Classes and objects", "Interfaces", "Nullable values", "Writing less code"]],
  ["Java", ["Using Java", "Exporting to Java"]],
  ["Projects", ["Multi-file projects", "Performance measurements"]],
  ["Libraries", ["mammoth.requests"]],
];
// Sections left off the site on purpose.
const skip = new Set(["License"]);
// Page addresses that would otherwise read badly.
const slugOverrides = { "mammoth.requests": "requests" };

// Matches the heading ids Astro generates (github-slugger).
const slugify = (text) =>
  text
    .replace(/`/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");

const readme = readFileSync(join(compilerDir, "README.md"), "utf8").replace(/\r\n/g, "\n");
const lines = readme.split("\n");

// Split into the intro (before the first "## ") and one chunk per "## " section.
// Headings inside code fences are ignored.
const sections = [];
let intro = [];
let current = null;
let inFence = false;
for (const line of lines) {
  if (line.startsWith("```")) inFence = !inFence;
  if (!inFence && line.startsWith("## ")) {
    current = { title: line.slice(3).trim(), body: [] };
    sections.push(current);
  } else if (current) current.body.push(line);
  else intro.push(line);
}
intro = intro.filter((line) => !line.startsWith("# "));

const pages = [];
let order = 1;
for (const [group, titles] of groups) {
  for (const title of titles) {
    const section = sections.find((s) => s.title === title);
    if (section) pages.push({ ...section, group, order: order++ });
  }
}
for (const section of sections) {
  if (!skip.has(section.title) && !pages.some((p) => p.title === section.title)) {
    pages.push({ ...section, group: "More", order: order++ });
    console.warn(`New README section "${section.title}" added under "More".`);
  }
}
for (const page of pages) page.slug = slugOverrides[page.title] ?? slugify(page.title);

// Which page each heading anchor lives on, so README links keep working.
const anchorPage = new Map();
for (const page of pages) {
  anchorPage.set(slugify(page.title), { slug: page.slug, top: true });
  for (const line of page.body) {
    const match = /^#{3,6} (.+)$/.exec(line);
    if (match) anchorPage.set(slugify(match[1]), { slug: page.slug, top: false });
  }
}

const rewriteLink = (target, fromSlug) => {
  if (/^[a-z]+:/i.test(target)) return target;
  if (target.startsWith("#")) {
    const anchor = target.slice(1);
    const home = anchorPage.get(anchor);
    if (!home) return target;
    const page = home.slug === "overview" ? "" : `${home.slug}/`;
    const prefix = fromSlug === "overview" ? "./" : "../";
    if (home.slug === fromSlug) return home.top ? "#" : `#${anchor}`;
    return `${prefix}${page}${home.top ? "" : `#${anchor}`}`;
  }
  // A file in the compiler repo, such as LICENSE or docs/development/PLAN.md.
  if (/^(LICENSE|[\w.-]+\/[\w./-]+|[\w.-]+\.(md|mam|txt))$/.test(target)) return repoBlob + target;
  return target;
};

// Mammoth code in the README is fenced as "text"; plain output stays text.
const looksLikeCode = (block) =>
  /\b(fun|let|var|class|interface|import|print|for|while|when|return|enum|object)\b|[{}=]|\w\(/.test(block);

const convert = (body, slug) => {
  const out = [];
  let fence = null;
  for (const line of body) {
    if (fence) {
      if (line.startsWith("```")) {
        const lang = fence.lang === "text" && looksLikeCode(fence.lines.join("\n")) ? "mammoth" : fence.lang;
        out.push("```" + lang, ...fence.lines, "```");
        fence = null;
      } else fence.lines.push(line);
      continue;
    }
    if (line.startsWith("```")) {
      fence = { lang: line.slice(3).trim() || "text", lines: [] };
      continue;
    }
    let text = line.replace(/^(#{3,6}) /, (_, hashes) => hashes.slice(1) + " ");
    // Rewrite links outside inline code spans.
    text = text
      .split(/(`[^`]*`)/)
      .map((part) =>
        part.startsWith("`")
          ? part
          : part.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, target) => `[${label}](${rewriteLink(target, slug)})`),
      )
      .join("");
    out.push(text);
  }
  return out.join("\n").trim() + "\n";
};

const frontmatter = (fields) =>
  "---\n" +
  Object.entries(fields)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n") +
  "\n---\n\n" +
  "<!-- Generated by scripts/sync-docs.mjs from the compiler README. Edit the README, not this file. -->\n\n";

mkdirSync(outDir, { recursive: true });
for (const file of readdirSync(outDir)) if (file.endsWith(".md")) rmSync(join(outDir, file));

writeFileSync(
  join(outDir, "overview.md"),
  frontmatter({ title: "Overview", group: "Start here", order: 0 }) + convert(intro, "overview"),
);
for (const page of pages) {
  writeFileSync(
    join(outDir, `${page.slug}.md`),
    frontmatter({ title: page.title, group: page.group, order: page.order }) + convert(page.body, page.slug),
  );
}
console.log(`Wrote ${pages.length + 1} pages to ${outDir}`);

// Keep syntax colouring in step with the VS Code extension's grammar.
const grammar = JSON.parse(
  readFileSync(join(compilerDir, "editors/vscode/syntaxes/mammoth.tmLanguage.json"), "utf8"),
);
writeFileSync(
  resolve("src/shiki/grammar.mjs"),
  "// Copied from the compiler repo: editors/vscode/syntaxes/mammoth.tmLanguage.json\n" +
    "// Refreshed by scripts/sync-docs.mjs.\n" +
    `export default ${JSON.stringify(grammar, null, 2)};\n`,
);
console.log("Updated src/shiki/grammar.mjs");
