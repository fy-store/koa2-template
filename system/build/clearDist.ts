import setConfig from '../config/index.js'
import fs from 'fs'
import path from 'path'

await setConfig()
const dist = path.join(sysConfig.rootPath, sysConfig.project.dist)
try {
	if (fs.existsSync(dist)) {
		fs.rmSync(dist, { recursive: true })
	}
	fs.mkdirSync(dist)
} catch (error) {
	if (error.code === 'EBUSY') {
		console.log('dist 正在被使用无法重新构建')
	}
	throw error
}
