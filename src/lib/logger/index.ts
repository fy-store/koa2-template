import path from 'path'
import log4js from 'log4js'
const { rootPath } = systemConfig
// @ts-ignore
log4js.configure({
	appenders: {
		/** 中断日志: 系统中断 */
		stopError: {
			type: 'dateFile',
			filename: path.join(rootPath, '/logs/stopErrorLog/stop.log'),
			pattern: 'yyyy-MM-dd',
			keepFileExt: true, // 保留文件后缀
			maxLogSize: 1024 * 1024, // 每个文件最大1MB
			fileNameSep: '_',
			numBackups: 500,
			layout: {
				type: 'pattern',
				pattern:
					'级别: %p%n' +
					'主机: %h%n' +
					'记录时间: %d{yyyy-MM-dd hh:mm:ss}%n' +
					'文件路径: %f%n' +
					'调用定位: %f:%l:%o%n' +
					'调用堆栈: %n%s%n' +
					'记录数据: %m%n'
			}
		},

		/** 数据库操作日志: 数据库的读写 */
		db: {
			type: 'dateFile',
			filename: path.join(rootPath, '/logs/dbLog/db.log'),
			pattern: 'yyyy-MM-dd',
			keepFileExt: true, // 保留文件后缀
			maxLogSize: 1024 * 1024, // 每个文件最大1MB
			fileNameSep: '_',
			numBackups: 500,
			layout: {
				type: 'pattern',
				pattern:
					'级别: %p%n' +
					'主机: %h%n' +
					'记录时间: %d{yyyy-MM-dd hh:mm:ss}%n' +
					'文件路径: %f%n' +
					'调用定位: %f:%l:%o%n' +
					'调用堆栈: %n%s%n' +
					'记录数据: %m%n'
			}
		},

		/** 错误日志: 不会导致系统瘫痪的错误 */
		error: {
			type: 'dateFile',
			filename: path.join(rootPath, '/logs/errorLog/error.log'),
			pattern: 'yyyy-MM-dd',
			keepFileExt: true, // 保留文件后缀
			maxLogSize: 1024 * 1024, // 每个文件最大1MB
			fileNameSep: '_',
			numBackups: 500,
			layout: {
				type: 'pattern',
				pattern:
					'级别: %p%n' +
					'主机: %h%n' +
					'记录时间: %d{yyyy-MM-dd hh:mm:ss}%n' +
					'文件路径: %f%n' +
					'调用定位: %f:%l:%o%n' +
					'调用堆栈: %n%s%n' +
					'记录数据: %m%n'
			}
		},

		/** 请求日志: 访客 */
		request: {
			type: 'dateFile',
			filename: path.join(rootPath, '/logs/requestLog/request.log'),
			pattern: 'yyyy-MM-dd',
			keepFileExt: true, // 保留文件后缀
			maxLogSize: 1024 * 1024, // 每个文件最大1MB
			fileNameSep: '_',
			numBackups: 500,
			layout: {
				type: 'pattern',
				pattern:
					'级别: %p%n' +
					'主机: %h%n' +
					'记录时间: %d{yyyy-MM-dd hh:mm:ss}%n' +
					'文件路径: %f%n' +
					'调用定位: %f:%l:%o%n' +
					'调用堆栈: %n%s%n' +
					'记录数据: %m%n'
			}
		},

		/** 默认日志: 只输出信息, 不做记录 */
		console: {
			type: 'console'
		}
	},
	categories: {
		/** 中断日志: 系统中断 */
		stopErrorLog: {
			enableCallStack: true,
			level: 'all',
			appenders: ['stopError'],
			pm2: true
		},

		/** 数据库操作日志: 数据库的读写 */
		dbLog: {
			enableCallStack: true,
			level: 'all',
			appenders: ['db'],
			pm2: true
		},

		/** 错误日志: 不会导致系统瘫痪的错误 */
		errorLog: {
			enableCallStack: true,
			level: 'all',
			appenders: ['error'],
			pm2: true
		},

		/** 请求日志: 访客 */
		requestLog: {
			enableCallStack: true,
			level: 'all',
			appenders: ['request'],
			pm2: true
		},

		/** 默认日志: 只输出信息, 不做记录 */
		default: {
			enableCallStack: true,
			level: 'all',
			appenders: ['console'],
			pm2: true
		}
	}
})

/** 中断日志: 系统中断 */
export const stopErrorLog = log4js.getLogger('stopErrorLog')

/** 数据库操作日志: 数据库的读写 */
export const dbLog = log4js.getLogger('dbLog')

/** 错误日志: 不会导致系统瘫痪的错误 */
export const errorLog = log4js.getLogger('errorLog')

/** 请求日志: 访客 */
export const requestLog = log4js.getLogger('requestLog')

/** 默认日志: 只输出信息, 不做记录 */
export const defaultLog = log4js.getLogger('default')

// 未正常退出时将未记录完的日志继续记录
process.on('exit', () => {
	log4js.shutdown()
})

// 中断异常记录
process.on('uncaughtException', (err, origin) => {
	defaultLog.error('进程中断错误', err, '\n')
	stopErrorLog.error(
		`\n    异常源: ${origin} => ${origin === 'uncaughtException' ? '同步错误' : 'Promise 被拒绝错误'}\n` +
			`    错误类型: ${err?.name}\n` +
			`    错误信息: ${err?.message}\n` +
			`    错误堆栈: ${err?.stack}`
	)

	log4js.shutdown(() => {
		process.exit(1)
	})
})
