module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential",
		'plugin:import/recommended' // 使用插件支持vue3
	],
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module",
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true
		}
	},
	"plugins": [
		"vue"
	],
	'globals': {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly'
	},
	// add your custom rules here
	rules: {
		'vue/comment-directive': 'off',
		'no-param-reassign': 'off',
		'global-require': 0,
		'linebreak-style': 'off',
		'import/extensions': ['error', {
			'vue': 'off'
		}],
		"vue/multi-word-component-names": "off",
		'import/no-cycle': 'off',
		// 变量名必须使用驼峰式
		// @off 暂不限制
		'camelcase': 0,
		// allow async-await
		'generator-star-spacing': 'off',
	},
	"settings": {
		"import/resolver": {
			"node": {
				"moduleDirectory": ["node_modules", "src/"],
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			},
			"alias": {
				"map": [["@", "./src"]],
				"extensions": [".js", ".vue"]
			}
		},
	}
};
