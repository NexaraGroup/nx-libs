/**
 * @file
 * 这个就是 next 脚手架的配置，额外配了规则
 * 这么搞就可以了，不必要纠结，是最佳实践
 */
module.exports = {
	extends: ['next/typescript', 'next/core-web-vitals'],
	rules: {
		// Next.js 特定规则
		'@next/next/no-html-link-for-pages': 'error',
		'@next/next/no-img-element': 'warn',

		// 覆盖某些React规则，以适应Next.js最佳实践
		'jsx-a11y/anchor-is-valid': 'off', // Next.js的Link组件处理方式特殊
	},
};
