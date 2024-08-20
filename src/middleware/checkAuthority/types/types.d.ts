// 为上下文提供类型
import { Session } from '#sysType'

declare module 'koa' {
	interface Context {
		/**
		 * 会话内容(白名单内的接口不保证有值)
		 */
		session: Session.JSONData
		/**
		 * 会话ID(白名单内的接口不保证有值或有效)
		 */
		sessionId: string
	}
}

declare module 'koa-router' {
	interface IRouterParamContext {
		/**
		 * 会话内容(白名单内的接口不保证有值)
		 */
		session: Session.JSONData
		/**
		 * 会话ID(白名单内的接口不保证有值或有效)
		 */
		sessionId: string
	}
}
