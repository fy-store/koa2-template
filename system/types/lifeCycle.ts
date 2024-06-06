import http from 'http'
import Koa from 'koa'

/**
 * beforeInit 上下文对象
 */
export interface TBeforeInitCtx {
	/**
	 * koa 实例对象(该钩子中为 null)
	 */
	app: null
	/**
	 * http 服务实例对象(该钩子中为 null)
	 */
	server: null
}

/**
 * inited 上下文对象
 */
export interface TInitedCtx {
	/**
	 * koa 实例对象
	 */
	app: Koa
	/**
	 * http 服务实例对象(该钩子中为 null)
	 */
	server: null
}

/**
 * beforeMount 上下文对象
 */
export interface TBeforeMountCtx {
	/**
	 * koa 实例对象
	 */
	app: Koa
	/**
	 * http 服务实例对象
	 */
	server: http.Server
}

/**
 * mounted 上下文对象
 */
export type TMountedCtx = TBeforeMountCtx

export interface TCallback {
	/**
	 * koa 应用实例之前
	 * @param ctx 上下文对象
	 */
	beforeInit?: (ctx: TBeforeInitCtx) => Promise<void> | void
	/**
	 * koa 应用实例创建完毕, http 服务启动前
	 * - 可在该钩子中对 koa 应用进行初始化操作, 如使用中间件
	 * @param ctx 上下文对象
	 */
	inited?: (ctx: TInitedCtx) => Promise<void> | void
	/**
	 * 在 koa 应用实例后且 http 服务创建完毕, 挂载端口前
	 * - 可在该钩子中对 koa 应用进行初始化操作, 如使用中间件 或 对 http 服务操作
	 * @param ctx 上下文对象
	 */
	beforeMount?: (ctx: TBeforeMountCtx) => Promise<void> | void
	/**
	 * 在 http 服务挂载到端口后
	 * @param ctx 上下文对象
	 */
	mounted?: (ctx: TMountedCtx) => Promise<void> | void
}
