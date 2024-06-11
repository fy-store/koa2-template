import pool from '../connect/index.js'

export type TQuery = (sql: string, q?: any[]) => Promise<[any[], any]>
export type TExecute = (sql: string, q?: any[]) => Promise<[any[], any]>

/**
 * db 上下文
 */
export interface TDbCtx {
	/**
	 * 数据库实例
	 */
	pool: typeof pool
	/**
	 * 用于操作数据库
	 */
	query: TQuery
	/**
	 * 用于操作数据库(带缓存优化)
	 */
	execute: TExecute
}

/**
 * 初始化 table
 */
export interface TInitTable {
	default?: (ctx: TDbCtx) => void | Promise<void> | any
	[key: string]: any
}
