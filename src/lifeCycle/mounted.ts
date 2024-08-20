import { output } from '#sysUtils'
import { type lifeCycle } from '#sysType'
export default (_ctx: lifeCycle.MountedCtx) => {
	if (sysConfig.env === 'production') {
		console.clear()
		output.success(sysConfig.project.devSuccess)
		console.log('')
		output.success(`✨ 当前为生产模式, ${sysConfig.project.port} 端口监听中...`)
		console.log('')
		output.success(`✨ 内网地址: http://127.0.0.1:${sysConfig.project.port}`)
		console.log('')
	}
}
