import fs from 'fs'
import path from 'path'
import hasDir from './hasDir.js'

const rootPath = path.resolve()
const dist = path.join(rootPath, '/dist')
try {
	if (hasDir(dist)) {
		fs.rmSync(dist, { recursive: true })
	}
	fs.mkdirSync(dist)
} catch (error) {
	if (error.code === 'EBUSY') {
		console.log('dist 正在被使用无法重新构建')
	}
	throw error
}
