import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "荆棘鸟文学社",
  description: "荆棘鸟文学社官方参考文档",

  head: [
    [
      'link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }
    ],
    [
      'link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
    ]
  ],

  theme,
});
