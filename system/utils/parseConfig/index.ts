import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { isType } from 'assist-tools'

/**
 * 配置文件解析器
 */
class ParseConfig {
	/**
	 * 同步解析 JSON 字符串
	 * @param content JSON 字符串
	 * @returns js 数据
	 */
	parseJSONSync<R = any>(content: string): R {
		return JSON.parse(content)
	}

	/**
	 * 同步解析 yaml 字符串
	 * @param content yaml 字符串
	 * @returns js 数据
	 */
	parseYamlSync<R = any>(content: string): R {
		return yaml.load(content) as any
	}

	/**
	 * 同步解析一个配置文件
	 * - 支持 .json 和 .yaml
	 * @param path 文件绝对路径
	 * @returns js 数据
	 */
	loadSync<R = any>(filePath: string): R {
		if (isType(filePath) !== 'string') {
			throw new TypeError('filePath must be a string !')
		}

		if (filePath.trim().length === 0) {
			throw new Error('filePath can not empty !')
		}

		const { ext } = path.parse(filePath)
		if (!['.json', '.yaml'].includes(ext)) {
			throw new TypeError('filePath extension name must be a ".json" or ".yaml" !')
		}

		let fileContent = ''
		try {
			fileContent = fs.readFileSync(filePath, 'utf-8')
		} catch (error) {
			if (error.code === 'ENOENT') {
				throw new Error('The file on the filePath does not exist !')
			}

			if (error.syscall === 'open') {
				throw new Error('Open file fail !')
			}

			throw error
		}

		if (ext === '.json') {
			return this.parseJSONSync<R>(fileContent)
		}

		return this.parseYamlSync<R>(fileContent)
	}

	/**
	 * 异步解析一个配置文件
	 * - 支持 .json 和 .yaml
	 * @param path 文件绝对路径
	 * @returns js 数据
	 */
	async load<R = any>(filePath: string): Promise<R> {
		if (isType(filePath) !== 'string') {
			throw new TypeError('filePath must be a string !')
		}

		if (filePath.trim().length === 0) {
			throw new Error('filePath can not empty !')
		}

		const { ext } = path.parse(filePath)
		if (!['.json', '.yaml'].includes(ext)) {
			throw new TypeError('filePath extension name must be a ".json" or ".yaml" !')
		}

		let fileContent = ''
		try {
			fileContent = await fs.promises.readFile(filePath, 'utf-8')
		} catch (error) {
			if (error.code === 'ENOENT') {
				throw new Error('The file on the filePath does not exist !')
			}

			if (error.syscall === 'open') {
				throw new Error('Open file fail !')
			}

			throw error
		}

		if (ext === '.json') {
			return this.parseJSONSync<R>(fileContent)
		}

		return this.parseYamlSync<R>(fileContent)
	}

	/**
	 * 同步解析目录下第一级配置文件
	 * - 该目录下仅允许存在 .json 和 .yaml 文件
	 * @param filePath 目录绝对路径
	 * @returns js 数据
	 */
	loadDirSync<R = any>(filePath: string): R {
		if (isType(filePath) !== 'string') {
			throw new TypeError('filePath must be a string !')
		}

		if (filePath.trim().length === 0) {
			throw new Error('filePath can not empty !')
		}

		const stats = fs.statSync(filePath)
		if (!stats.isDirectory()) {
			throw new TypeError('filePath must be a directory !')
		}

		const list = fs.readdirSync(filePath)
		const contentList = list.map((item) => {
			const { name } = path.parse(item)
			return [name, this.loadSync(path.join(filePath, item))]
		})
		return Object.fromEntries(contentList)
	}

	/**
	 * 异步解析目录下第一级配置文件
	 * - 该目录下仅允许存在 .json 和 .yaml 文件
	 * @param filePath 目录绝对路径
	 * @returns js 数据
	 */
	async loadDir<R = any>(filePath: string): Promise<R> {
		if (isType(filePath) !== 'string') {
			throw new TypeError('filePath must be a string !')
		}

		if (filePath.trim().length === 0) {
			throw new Error('filePath can not empty !')
		}

		const stats = await fs.promises.stat(filePath)
		if (!stats.isDirectory()) {
			throw new TypeError('filePath must be a directory !')
		}

		const list = await fs.promises.readdir(filePath)
		const contentList = list.map(async (item) => {
			const { name } = path.parse(item)
			const content = await this.load(path.join(filePath, item))
			return [name, content]
		})

		return Object.fromEntries(await Promise.all(contentList))
	}
}

export default new ParseConfig()
