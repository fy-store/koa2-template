import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import ignore from 'rollup-plugin-ignore'
import { builtinModules } from 'module'
import { defineConfig } from 'rollup'

export default defineConfig({
	input: path.resolve('./system/index.ts'),
	output: {
		dir: path.resolve('./dist/src'),
		format: 'esm',
		sourcemap: true
	},
	plugins: [
		// @ts-ignore
		resolve(), // 解析 node_modules 中的模块
		// @ts-ignore
		commonjs(), // 将 CommonJS 模块转换为 ES6 版本
		// @ts-ignore
		typescript(), // 使用 tsconfig.json 配置 TypeScript
		ignore(['../src/index1.js', '../../project.config.js']),
		// @ts-ignore
		json() // 处理 JSON 文件的导入
	],
	external: [
		...builtinModules, // 排除所有 Node.js 内置模块
		/node_modules/ // 排除所有 node_modules 中的模块
	]
})
