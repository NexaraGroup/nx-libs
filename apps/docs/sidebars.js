/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	docs: [
		{
			type: 'category',
			label: '入门',
			items: ['intro', 'installation', 'getting-started'],
		},
		{
			type: 'category',
			label: '使用指南',
			items: ['guides/monorepo-structure', 'guides/contributing', 'guides/quality-assurance'],
		},
		{
			type: 'category',
			label: '包介绍',
			items: [
				'packages/format',
				'packages/typescript-config',
				'packages/eslint-config',
				'packages/prettier-config',
			],
		},
	],
};
