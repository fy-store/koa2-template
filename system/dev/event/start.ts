import '../../config/index.js'
import fs from 'fs'
import path from 'path'
import output from '../../utils/output/index.js'
import parseConfig from '../../utils/parseConfig/index.js'

const statePath = path.join(import.meta.dirname, '../state.json')
const state = parseConfig.loadSync(statePath)
if (state.start) {
	const { startClearConsole, startSuccessTip, startOutputLocalhost, startOutputIP, startOutputENV, port } =
		sysConfig.project

	if (startClearConsole) {
		console.clear()
	}

	if (startSuccessTip) {
		output.success(sysConfig.project.devSuccess)
		console.log('')
	}

	if (startOutputLocalhost) {
		output.success(`✨ http://localhost:${port}`)
		console.log('')
	}

	if (startOutputIP) {
		output.success(`✨ http://${sysConfig.ip}:${port}`)
		console.log('')
	}

	if (startOutputENV) {
		output.success(`✨ 当前为开发模式, ${port} 端口监听中...`)
		console.log('')
	}
} else {
	state.start = true
	fs.writeFileSync(statePath, JSON.stringify(state, null, 4))
}
