import { defineConfig } from "astro/config";
export default defineConfig({
  output: "static",
  // Served by GitHub Pages at evilstdio.github.io/mammoth-website/
  site: "https://evilstdio.github.io",
  base: "/mammoth-website/",
  devToolbar: { enabled: false },
});
