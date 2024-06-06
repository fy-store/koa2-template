import { defaultLog, errorLog } from '../logger/index.js'

/** 路由错误记录 */
export default (err: Error) => {
	const text = `\n    错误类型: ${err.name}\n` + `    错误信息: ${err.message}\n` + `    错误堆栈: ${err.stack}`
	defaultLog.error('路由错误', err, '\n')
	errorLog.error(text)
}
