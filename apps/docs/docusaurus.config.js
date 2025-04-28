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

	// SEO 相关配置
	noIndex: false, // 允许搜索引擎索引

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
			metadata: [
				{ name: 'keywords', content: '前端工具库, nx-utils, 工具集合, 开发工具' },
				{
					name: 'description',
					content: 'NX Utils 是一个前端工具库集合，提供各种实用的开发工具和配置。',
				},
			],
		}),
};
