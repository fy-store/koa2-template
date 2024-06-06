import { TInitTable } from '../types/index.js'
import './init.js'
import mysql2 from 'mysql2/promise'
const { host, user, port, password, database } = config.mysql

// 创建连接池，设置连接池的参数
const pool = mysql2.createPool({
	host,
	port,
	user,
	password,
	database,
	charset: 'utf8mb4',
	multipleStatements: true,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
	maxIdle: 10,
	// debug: true,
	// idleTimeout: 1000 * 60 * 60 * 24,  // 空闲连接超时时间，单位毫秒
	idleTimeout: 0
})

// 使用数据库
await pool.query(`use ${database}`)

export default pool
export const execute = pool.execute.bind(pool)
export const query = pool.query.bind(pool)

const initTable: TInitTable = await import('../initTable/index.js')
if (initTable.default) {
	await initTable.default({ pool, execute, query })
}
