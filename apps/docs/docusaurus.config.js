const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "NX Utils",
  tagline: "高质量的前端工具库集合",
  url: "https://nx-utils.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "nx-utils", // 通常是你的 GitHub org/用户名
  projectName: "nx-utils", // 通常是你的仓库名

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // 修改为你的仓库
          editUrl: "https://github.com/nx-utils/nx-utils/edit/main/apps/docs/",
          routeBasePath: "/", // 将文档设置为首页
        },
        blog: false, // 禁用博客功能
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "NX Utils",
        logo: {
          alt: "NX Utils Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "文档",
          },
          {
            type: "doc",
            docId: "api/index",
            position: "left",
            label: "API",
          },
          {
            href: "https://github.com/nx-utils/nx-utils",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "文档",
            items: [
              {
                label: "快速开始",
                to: "/",
              },
              {
                label: "API 参考",
                to: "/api",
              },
            ],
          },
          {
            title: "社区",
            items: [
              {
                label: "GitHub Discussions",
                href: "https://github.com/nx-utils/nx-utils/discussions",
              },
              {
                label: "问题反馈",
                href: "https://github.com/nx-utils/nx-utils/issues",
              },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/nx-utils/nx-utils",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NX Utils. 使用 Docusaurus 构建。`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "diff", "json"],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};
