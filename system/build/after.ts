import setConfig from '../config/index.js'
import fs from 'fs'
import path from 'path'

await setConfig()
console.clear()

// 复制
sysConfig.project.copyFiles.forEach((p) => {
	const originPath = path.join(sysConfig.rootPath, p)
	const targetPath = path.join(sysConfig.rootPath, sysConfig.project.dist, p)
	fs.cpSync(originPath, targetPath, { recursive: true })
})

{
	// 处理 package.json
	const packPath = path.join(sysConfig.rootPath, '/package.json')
	const newPackPath = path.join(sysConfig.rootPath, '/dist/package.json')
	const pack = JSON.parse(fs.readFileSync(packPath, 'utf8'))
	const { type, name, version, description, author, license, dependencies, volta } = pack
	const scripts = {
		start: 'node ./src/index.js'
	}
	const newPack = { type, name, version, description, scripts, author, license, dependencies, volta }
	fs.writeFileSync(newPackPath, JSON.stringify(newPack, null, 4))
}

{
	// 复制静态资源目录
	const originPath = path.join(sysConfig.rootPath, sysConfig.project.publicPath)
	const targetPath = path.join(sysConfig.rootPath, sysConfig.project.dist, sysConfig.project.publicPath)
	if (fs.existsSync(originPath)) {
		fs.cpSync(originPath, targetPath, { recursive: true })
	}
}
