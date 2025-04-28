const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'NX Utils',
	tagline: '前端工具库集合',
	url: 'https://nx-utils.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'NexaraGroup', // GitHub组织/用户名
	projectName: 'nx-utils', // 仓库名

	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					path: 'docs',
					routeBasePath: 'docs',
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/NexaraGroup/nx-utils/edit/main/apps/docs/',
				},
				blog: false, // 禁用博客功能
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'NX Utils',
				logo: {
					alt: 'NX Utils Logo',
					src: 'img/logo.jpg',
				},
				items: [
					{
						to: '/',
						label: '首页',
						position: 'left',
						activeBaseRegex: '^/$',
					},
					{
						to: '/docs/',
						label: '文档',
						position: 'left',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: '相关链接',
						items: [
							{
								label: '问题反馈',
								href: 'https://github.com/NexaraGroup/nx-utils/issues',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} NX Utils. 使用 Docusaurus 构建。`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
				additionalLanguages: ['bash', 'diff', 'json'],
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: false,
				respectPrefersColorScheme: true,
			},
		}),
};
