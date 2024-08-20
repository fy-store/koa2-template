import '../../config/index.js'
import fs from 'fs'
import path from 'path'
import output from '../../utils/output/index.js'
import parseConfig from '../../utils/parseConfig/index.js'

const statePath = path.join(import.meta.dirname, '../state.json')
const state = parseConfig.loadSync(statePath)

state.start = false
fs.writeFileSync(statePath, JSON.stringify(state, null, 4))

if (sysConfig.project.restartClearConsole) {
	console.clear()
}

if (sysConfig.project.restartTip) {
	output.success('🛠️  监听中...')
	console.log('')
}
