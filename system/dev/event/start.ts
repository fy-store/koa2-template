import '@system/core/importPublicConfig.js'
import '@system/core/importSystemConfig.js'
import output from '../../lib/output/index.js'

if (config.system.dev.startClear) {
	console.clear()
}

if (config.system.dev.startTip) {
	console.log('')
	output.success(globalThis.systemConfig.dev.success)
	console.log('')
	output.success(`✨ http://127.0.0.1:${globalThis.config.system.project.port}`)
	console.log('')
	output.success(`✨ http://${globalThis.systemConfig.ip}:${globalThis.config.system.project.port}`)
	console.log('')
	output.success(`✨ 当前为开发模式, ${globalThis.config.system.project.port} 端口监听中...`)
	console.log('')
}
