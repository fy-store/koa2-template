import mysql from 'mysql2/promise'
import { output } from '#systemLib'
const { host, user, port, password, database } = config.mysql

try {
	// 创建一个数据库连接
	const connection = await mysql.createConnection({
		host,
		user,
		port,
		password
	})
	await connection.query(
		`create database if not exists ${database} default character set utf8mb4 default collate utf8mb4_bin`
	)
	await connection.end()
} catch (err) {
	output.danger('MySQL 数据库初始化失败 !')
	throw err
}
