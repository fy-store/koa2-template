import { output } from '#systemLib'
import { type TMountedCtx } from '@system/types/lifeCycle.js'
export default (_ctx: TMountedCtx) => {
	if (systemConfig.env === 'production') {
		console.clear()
		console.log('')
		output.success(systemConfig.dev.success)
		console.log('')
		output.success(`✨ 当前为生产模式, ${config.system.project.port} 端口监听中...`)
		console.log('')
	}
}
