# 荆棘鸟文学社参考文档
![GitHub Repo stars](https://img.shields.io/github/stars/szhhwh/jingji_TSreference_vue)![GitHub top language](https://img.shields.io/github/languages/top/szhhwh/jingji_TSreference_vue)![GitHub](https://img.shields.io/github/license/szhhwh/jingji_TSreference_vue)![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/szhhwh/jingji_TSreference_vue)

## 开发
1. 依赖环境
- Node.js v24.19.0 (LTS)
- [mise](https://mise.jdx.dev/)

2. 建议使用 [mise](https://mise.jdx.dev/) 管理 [Node.js](https://nodejs.org/) 与 pnpm。版本在项目根目录的 ``.mise.toml`` 中声明：
```sh
mise install
```

3. 安装依赖
```sh
pnpm i
```
4. 本地预览
```sh
pnpm run docs:dev
```
5. 构建静态页面。构建完成的网页会保存在 ``src\.vuepress\dist``
```sh
pnpm run docs:build
```

6. 更新依赖（参考 [vuepress-theme-hope 文档](https://theme-hope.vuejs.press/zh/get-started/command.html)）
```sh
pnpm dlx vp-update
```