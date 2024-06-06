import mysql2 from 'mysql2'
import pool from '../db/index.js'

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
	query: mysql2.Query
	/**
	 * 用于操作数据库(带缓存优化)
	 */
	execute: mysql2.Query
}

/**
 * 初始化 table
 */
export interface TInitTable {
	default?: (ctx: TDbCtx) => void | Promise<void> | any
	[key: string]: any
}
