import path from 'path'
import { readOnly } from 'assist-tools'
import { parseConfig } from '#sysUtils'

export default {
	project: {
		copyFiles: ['/src/config']
	},
	async beforeLoad() {
		// 将配置挂载至全局
		const config = parseConfig.loadDirSync(path.join(sysConfig.rootPath, '/src/config'))
		globalThis.config = readOnly(config, 'looseFitting')
	}
}
