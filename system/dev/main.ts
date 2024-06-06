// 开发环境入口
import '../core/init.js'
import http from 'http'
import Koa from 'koa'
import { output } from '#systemLib'
import { type TCallback } from '@system/types/lifeCycle.js'

const getLifeCycle = async (): Promise<TCallback> => {
	try {
		// @ts-ignore
		const { default: lifeCycle = {} } = await import('@/main.js')
		return lifeCycle
	} catch (error) {
		if (error?.code === 'ERR_MODULE_NOT_FOUND') return {}
		throw error
	}
}

getLifeCycle().then(async (lifeCycle) => {
	if (lifeCycle.beforeInit) await lifeCycle.beforeInit({ app: null, server: null })
	const app = new Koa({ env: process.env.NODE_ENV })
	if (lifeCycle.inited) await lifeCycle.inited({ app, server: null })

	const server = http.createServer(app.callback())
	server.on('error', (error: any) => {
		if (error?.code === 'EADDRINUSE') {
			output.danger(
				globalThis.systemConfig.dev.fail.replaceAll('{{port}}', String(globalThis.config.system.project.port))
			)
			console.error(error)
			return
		}
		throw error
	})
	if (lifeCycle.beforeMount) await lifeCycle.beforeMount({ app, server })

	server.listen(globalThis.config.system.project.port, async () => {
		if (lifeCycle.mounted) await lifeCycle.mounted({ app, server })
	})
})
