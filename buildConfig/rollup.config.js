import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { builtinModules } from 'module' 

export default {
	input: './system/main.ts', 
	output: {
		dir: './dist/src',
		format: 'esm', 
		sourcemap: true 
	},
	plugins: [
		resolve(), // 解析 node_modules 中的模块
		commonjs(), // 将 CommonJS 模块转换为 ES6 版本
		typescript({ tsconfig: './tsconfig.json' }), // 使用 tsconfig.json 配置 TypeScript
		json() // 处理 JSON 文件的导入
	],
	external: [
		...builtinModules, // 排除所有 Node.js 内置模块
		/node_modules/ // 排除所有 node_modules 中的模块
	]
}
