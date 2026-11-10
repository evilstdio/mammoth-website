// Syntax colouring for Mammoth code, shared by Markdown docs and the <MamCode> component.
import grammar from "./grammar.mjs";

export const mammothLang = { ...grammar, name: "mammoth", aliases: ["mam"] };

// Matches the landing page's frozen code panel.
export const mammothTheme = {
  name: "mammoth-ice",
  type: "dark",
  colors: {
    "editor.background": "#0d2438",
    "editor.foreground": "#e4eef6",
  },
  tokenColors: [
    { settings: { foreground: "#e4eef6" } },
    { scope: ["comment"], settings: { foreground: "#7d9bb2", fontStyle: "italic" } },
    {
      scope: ["keyword", "storage", "constant.language", "variable.language"],
      settings: { foreground: "#7fd4ff" },
    },
    { scope: ["keyword.operator"], settings: { foreground: "#b7ccdc" } },
    { scope: ["keyword.operator.logical"], settings: { foreground: "#7fd4ff" } },
    { scope: ["string"], settings: { foreground: "#ffd28a" } },
    {
      scope: ["constant.character.escape", "punctuation.section.interpolation"],
      settings: { foreground: "#fff0c9" },
    },
    { scope: ["constant.numeric"], settings: { foreground: "#ffb38a" } },
    { scope: ["support.type", "entity.name", "entity.name.type"], settings: { foreground: "#a8ecd2" } },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#ffffff" },
    },
    { scope: ["variable.other.readwrite", "variable.parameter"], settings: { foreground: "#e4eef6" } },
    { scope: ["invalid"], settings: { foreground: "#ff9a9a" } },
  ],
};
