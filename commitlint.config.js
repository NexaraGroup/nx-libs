/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 允许scope为可选
		'scope-empty': [0, 'never'],

		// 将长度限制改为 120 字符
		'header-max-length': [2, 'always', 300],

		// 定义允许的提交类型
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新特性
				'fix', // 修复bug
				'docs', // 文档更改
				'style', // 不影响代码运行的格式化修改
				'refactor', // 代码重构
				'perf', // 性能优化
				'test', // 添加测试
				'chore', // 构建过程或辅助工具的变动
				'revert', // 回滚代码
				'ci', // CI配置变更
				'build', // 影响构建系统或外部依赖的更改
			],
		],
	},
	// 自定义提示信息
	prompt: {
		questions: {
			type: {
				description: '选择你要提交的类型:',
			},
			scope: {
				description: '选择一个更改范围 (可选):',
			},
			subject: {
				description: '写一个简短的变更描述:',
			},
		},
	},
};
