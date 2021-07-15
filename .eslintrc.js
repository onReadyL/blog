module.exports = {
	root: true,
	extends: [
		'airbnb-base',
		// "prettier", // prettier代码风格格式化代码
		'eslint:recommended', // 启用推荐的规则
		// 'plugin:prettier/recommended',
		'plugin:react/recommended',
	],
	parser: 'babel-eslint',
	// "installedESLint": true,
	settings: {
		// 自动发现React的版本，从而进行规范react代码
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
	plugins: ['eslint-comments', 'react', 'prettier', 'mocha'],
	env: {
		// 用于指定环境
		browser: true,
		node: true,
		commonjs: true,
		mocha: true,
		es6: true,
	},
	parserOptions: {
		// 解析器要想使用的环境配置参数
		ecmaVersion: 2019, // 默认是5，在我们这里是用了最新的 2019。
		sourceType: 'module', // 默认'script'，但一般使用ECMAScript模块形式''module
		ecmafeatures: {
			globalReturn: false, // 允许在全局作用域下使用return语句
			impliedStrict: false, // 启用全局strict模式（严格模式）
			jsx: true, // 启用JSX
			arrowFunctions: true,
			classes: true,
			modules: true,
			defaultParams: true,
			experimentalDecorators: true,
			experimentalObjectRestSpread: true, // 启用对实验性的objectRest/spreadProperties的支持
		},
	},
	rules: {
		'max-len': ['error', { code: 120 }],
		'no-console': 1, // 禁止console 0 = off, 1 = warn, 2 = error
		'no-tabs': 0,
		'prettier/prettier': [2, { singleQuote: true, endOfLine: 'auto' }], // prettier的配置
		'prop-types': [0],
		'linebreak-style': ['error', 'unix'],
		'no-empty': 2, // 禁止空语句块
		'comma-dangle': 0,
		'no-unused-vars': 1,
		'no-shadow': 0, // 禁止 var 声明 与外层作用域的变量同名
		'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
		'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
		'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
		'no-const-assign': 2,
		'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
		'no-dupe-class-members': 2,
		'no-duplicate-case': 2,
		'no-undefined': 2, // 禁止将 undefined 作为标识符
		'no-undef-init': 2, // 禁止将变量初始化为 undefined
		'no-shadow-restricted-names': 2, // 禁止覆盖受限制的标识符
		'no-extra-parens': [2, 'functions'],
		'no-self-compare': 2,
		'accessor-pairs': 2,
		'comma-spacing': [
			2,
			{
				// 控制逗号前后的空格
				before: false,
				after: true,
			},
		],
		'func-names': 0, // 忽略函数名的lint
		'eol-last': 2, // 文件末尾强制换行
		indent: ['error', 'tab'], // tab缩进
		'no-alert': 1,
		'func-call-spacing': 2, // 要求或禁止在函数标识符和其调用之间有空格
		'computed-property-spacing': [2, 'never'], // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
		'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现 (默认行尾)
		'block-spacing': [1, 'never'], // 禁止或强制在单行代码块中使用空格(禁用)
		// 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
		'array-bracket-spacing': [2, 'never'],
		'no-use-before-define': 1, // 不允许在变量定义之前使用它们
		curly: [2, 'all'], // 强制所有控制语句使用一致的括号风格 multi
		'constructor-super': 2,
		'no-label-var': 2, // 不允许标签与变量同名
		'no-catch-shadow': 0, // 禁止 catch 子句的参数与外层作用域中的变量同名
		'no-bitwise': 0, // 禁用按位运算符
		'new-cap': [
			2,
			{
				newIsCap: true,
				capIsNew: false,
			},
		],
		'no-restricted-globals': 2, // 禁用特定的全局变量
		'new-parens': 2,
		'no-array-constructor': 2,
		'no-class-assign': 2,
		'no-cond-assign': 2,
		'no-mixed-spaces-and-tabs': 1,
		'no-extend-native': 0, // 全局对象允许扩展ps:Function.proptype
		'prefer-rest-params': 0, // 启用arguments 变量
		'consistent-return': 0, // 箭头函数必须有返回值
		'prefer-const': 2, // 没使用的变量用const
		'no-plusplus': 0,
		'no-param-reassign': 0,
	},
};
