import './init.js'
import mysql2 from 'mysql2/promise'
import initTable from '../initTable/index.js'
import { TQuery, TExecute } from '../types/index.js'
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

const execute: TExecute = pool.execute.bind(pool)
const query: TQuery = pool.query.bind(pool)

if (initTable) {
	await initTable({ pool, execute, query })
}

export { execute, query }
export default pool
