import fs from 'fs/promises'
import path from 'path'
import { output } from '#sysUtils'

export default async () => {
	/** 前端静态资源处理 */
	try {
		const webPath = path.join(sysConfig.rootPath, config.project.webPath)
		await fs.mkdir(webPath, { recursive: true })
	} catch (error) {
		if (error.code !== 'EEXIST') {
			output.danger(`创建目录时发生错误: ${error.message}`)
		}
	}
}
