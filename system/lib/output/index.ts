import chalk from 'chalk'

export const danger = chalk.hex(globalThis.systemConfig.color.danger)
export const warning = chalk.hex(globalThis.systemConfig.color.warning)
export const normal = chalk.hex(globalThis.systemConfig.color.normal)
export const success = chalk.hex(globalThis.systemConfig.color.success)

export default {
	/**
	 * 输出失败信息到控制台
	 */
	danger(...args: unknown[]) {
		console.log(danger(args))
	},
	/**
	 * 输出警告信息到控制台
	 */
	warning(...args: unknown[]) {
		console.log(warning(args))
	},
	/**
	 * 输出普通信息到控制台
	 */
	normal(...args: unknown[]) {
		console.log(normal(args))
	},
	/**
	 * 输出成功信息到控制台
	 */
	success(...args: unknown[]) {
		console.log(success(args))
	}
}
