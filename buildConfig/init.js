import fs from 'fs'
import path from 'path'
import './clearDist.js'
import hasDir from './hasDir.js'

console.clear()

// 复制配置文件
const rootPath = path.resolve()
const configPath = path.join(rootPath, '/src/config')
const newConfigPath = path.join(rootPath, '/dist/src/config')
const systemConfigPath = path.join(rootPath, '/system/config')
const newSystemConfigPath = path.join(rootPath, '/dist/system/config')

fs.cpSync(configPath, newConfigPath, { recursive: true })
fs.cpSync(systemConfigPath, newSystemConfigPath, { recursive: true })

// 处理 package.json
const packPath = path.join(rootPath, '/package.json')
const newPackPath = path.join(rootPath, '/dist/package.json')
const pack = JSON.parse(fs.readFileSync(packPath, 'utf8'))
const { type, name, version, description, author, license, dependencies, volta } = pack
const scripts = {
	start: 'node ./src/main.js'
}
const newPack = { type, name, version, description, scripts, author, license, dependencies, volta }
fs.writeFileSync(newPackPath, JSON.stringify(newPack, null, 4))

// 复制 src/public
const publicPath = path.join(rootPath, '/src/public')
const newPublicPath = path.join(rootPath, '/dist/src/public')
if (hasDir(publicPath)) {
	fs.cpSync(publicPath, newPublicPath, { recursive: true })
}
