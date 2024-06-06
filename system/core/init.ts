import fs from 'fs'
import path from 'path'
import '@system/core/importPublicConfig.js'
import '@system/core/importSystemConfig.js'

if (process.env.NODE_ENV === void 0) {
	process.env.NODE_ENV = 'production'
} else {
	process.env.NODE_ENV = 'production'
}

const publicPath = path.join(systemConfig.rootPath, systemConfig.dev.publicPath)
fs.mkdirSync(publicPath, { recursive: true })
