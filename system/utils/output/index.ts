import chalk from 'chalk'

export const danger = chalk.hex(sysConfig.project.colorDanger)
export const warning = chalk.hex(sysConfig.project.colorWarning)
export const normal = chalk.hex(sysConfig.project.colorNormal)
export const success = chalk.hex(sysConfig.project.colorSuccess)

export default {
	/**
	 * 输出失败信息到控制台
	 */
	danger(...args: any[]) {
		console.log(danger(args))
	},
	/**
	 * 输出警告信息到控制台
	 */
	warning(...args: any[]) {
		console.log(warning(args))
	},
	/**
	 * 输出普通信息到控制台
	 */
	normal(...args: any[]) {
		console.log(normal(args))
	},
	/**
	 * 输出成功信息到控制台
	 */
	success(...args: any[]) {
		console.log(success(args))
	}
}
