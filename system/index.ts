import fs from 'fs'
import path from 'path'
import http from 'http'
import Koa from 'koa'
import { type lifeCycle } from './types/index.js'

const run = async () => {
	const load = await import('./core/index.js')
	await load.default()
	const { output } = await import('./utils/index.js')

	type EntryModule = {
		default: lifeCycle.LifeCycle
	}

	const ctx = {
		app: null,
		server: null
	}

	const srcPathJs = path.join(import.meta.dirname, '../src/index.js')
	const srcPathTs = path.join(import.meta.dirname, '../src/index.ts')
	let lifeCycle: lifeCycle.LifeCycle
	if (fs.existsSync(srcPathJs) || fs.existsSync(srcPathTs)) {
		// @ts-ignore
		const { default: src } = (await import('../src/index.js')) as EntryModule
		lifeCycle = src
	}

	if (lifeCycle?.beforeInit) {
		await lifeCycle.beforeInit(ctx)
	}

	const app = new Koa({ env: process.env.NODE_ENV })
	ctx.app = app

	if (lifeCycle?.inited) {
		await lifeCycle.inited(ctx)
	}

	const server = http.createServer(app.callback())
	ctx.server = server
	server.on('error', (error: any) => {
		// 判断端口是否被占用
		if (error?.code === 'EADDRINUSE') {
			output.danger(sysConfig.project.devFail.replaceAll('{{port}}', String(sysConfig.project.port)))
			console.error(error)
			return
		}
		throw error
	})

	if (lifeCycle?.beforeMount) {
		await lifeCycle.beforeMount(ctx)
	}

	server.listen(sysConfig.project.port, async () => {
		if (lifeCycle?.mounted) {
			await lifeCycle.mounted(ctx)
		}
	})
}

run()
