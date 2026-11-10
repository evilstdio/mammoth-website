// Facts about the current Mammoth release, shared by every page.
// Update these when a new compiler version ships.
export const release = {
  version: "0.1.0",
  status: "Experimental preview",
  repo: "https://github.com/evilstdio/Mammoth",
  page: "https://github.com/evilstdio/Mammoth/releases/tag/v0.1.0",
  setup: {
    name: "mammoth-0.1.0-setup.exe",
    url: "https://github.com/evilstdio/Mammoth/releases/download/v0.1.0/mammoth-0.1.0-setup.exe",
    size: "42 MB",
  },
  zip: {
    name: "mammoth-0.1.0-windows-x64.zip",
    url: "https://github.com/evilstdio/Mammoth/releases/download/v0.1.0/mammoth-0.1.0-windows-x64.zip",
    size: "43 MB",
  },
};

/** Builds a link that works under the GitHub Pages sub-path. */
export const url = (path = "") => import.meta.env.BASE_URL + path.replace(/^\//, "");
