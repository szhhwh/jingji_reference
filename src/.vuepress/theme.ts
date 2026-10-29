import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://book.jjnwxs.cn/",

  author: {
    name: "荆棘鸟文学社",
    url: "https://github.com/szhhwh/",
  },

  logo: "/logo.png",
  logoDark: '/logo-dark.png',

  repo: "szhhwh/jingji_reference",

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "荆棘鸟文学社美编部",

  displayFooter: true,

  // markdown
  markdown: {
    gfm: false,
    sub: true,
    sup: true,
    vPre: true,
    vuePlayground: false,
    align: true,
    attrs: true,
    include: true,
    chartjs: false,
    demo: false,
    echarts: false,
    flowchart: false,

    mark: true,
    mermaid: false,
    playground: {
      presets: ["ts", "vue"],
    },
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    math: {
      type: "katex"
    },
    tabs: true,
    imgSize: true,
    figure: true,
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    copyright: true,
    components: {
      components: ["Badge", "BiliBili"],
    },
    git: {
      contributors: {
        info: [{
          username: "szhhwh",
          name: "szhhlionhao",
          email: "szhhlionhao@qq.com",
          emailAlias: ["3116737282@qq.com", "31694737+szhhwh@users.noreply.github.com"],
        }],
      },
    },
    slimsearch: true,
    icon: {
      assets: "fontawesome",
    }
  },
  pageInfo: [
    "Author", "Date", "ReadingTime", "Word"
  ],
  editLink: false,
});