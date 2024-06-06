import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

/**
 * 传入一个配置文件目录, 返回解析后的配置
 * - 解析配置采用同步加载
 * - 配置文件目录内文件仅允许 .yaml 和 .json
 * @param dirPath 配置文件目录绝对路径
 * @returns 解析后的配置
 */
export default <T>(dirPath: string): T => {
	const dir = fs.readdirSync(dirPath)
	const config = {}

	dir.map(async (filePath) => {
		const { name, ext } = path.parse(filePath)
		filePath = path.join(dirPath, filePath)
		if (!(ext === '.yaml' || ext === '.json')) {
			throw new TypeError('配置文件只能是 .yaml 或 .json')
		}

		const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
		let pathContent = null
		if (ext === '.yaml') {
			pathContent = fileContent ? yaml.load(fileContent) : {}
		} else {
			pathContent = fileContent ? JSON.parse(fileContent) : {}
		}
		config[name] = pathContent
		return pathContent
	})

	return config as T
}
