import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://pfistse.github.io",
  base: "/stocbench-page",
  integrations: [mdx()],
});
