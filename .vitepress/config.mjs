import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

export default defineConfig({
  base: '/learn/', 
  title: "learn-blog",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "JavaScript", link: "/javascript/专题系列/debounce.md" },
      { text: "HTML", link: "/html/index.md" },
    ],
    sidebar: generateSidebar([
      {
        documentRootPath: "./",
        scanStartPath: "javascript",
        resolvePath: "/javascript/",
        useTitleFromFrontmatter: true,
        folderNameAsTitle: true,
        collapseDepth: 2, // 嵌套层级
      },
      {
        documentRootPath: "./",
        scanStartPath: "html",
        resolvePath: "/html/",
        useTitleFromFrontmatter: true,
        folderNameAsTitle: true,
        collapseDepth: 2, // 嵌套层级
      },
    ]),
  },
});
