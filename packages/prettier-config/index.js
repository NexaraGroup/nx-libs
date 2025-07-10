/**
 * @file
 * 有的时候，修改需要重启 IDE
 * 导入顺序那块，是对应 @nxlibs/eslint-config/base 中的 import/order 规则
 */

module.exports = {
	// 使用单引号
	singleQuote: true,

	// 如果对象写了引号，保留
	quoteProps: 'preserve',

	// 尾逗号
	trailingComma: 'all',

	// 一行最多100个字符
	printWidth: 100,

	// 使用制表符缩进
	useTabs: true,

	// 制表符宽度
	tabWidth: 4,

	// 行尾使用LF
	endOfLine: 'lf',

	// 导入排序规则 - 与ESLint的import/order对应
	importOrder: [
		'^node:', // Node.js内置模块 (对应builtin)
		'<THIRD_PARTY_MODULES>', // 外部依赖 (对应external)
		'^@(/.*|$)', // 内部别名模块 (对应internal)
		'^\\.\\.(/.*|$)', // 父目录模块 (对应parent)
		'^\\./(?!index)', // 同级目录 (对应sibling)
		'^\\./?index', // index文件 (对应index)
	],
	importOrderSeparation: true, // 对应ESLint中的newlines-between: "always"
	importOrderSortSpecifiers: true, // 对应按字母排序导入的命名导出
	importOrderCaseInsensitive: true, // 对应ESLint中的caseInsensitive: true

	// 使用的插件
	plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-packagejson'],
};
