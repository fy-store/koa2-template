import { isType } from 'assist-tools'
import sysConfig, { type SysConfig } from './sys.js'
export { sysConfig, SysConfig }

// 覆盖系统配置
export default async () => {
	let projectConfig: any
	try {
		// @ts-ignore
		projectConfig = await import('../../project.config.js')
	} catch (error) {
		return
	}

	if (projectConfig.default === void 0) {
		return
	}

	const config = projectConfig.default
	if (isType(config) !== 'object') {
		throw new TypeError('配置文件返回必须是一个对象 !')
	}

	if (config.project !== void 0) {
		if (isType(config.project) !== 'object') {
			throw new TypeError('project 配置项必须是一个对象 !')
		}

		const sysProject = sysConfig.project
		const userProject = config.project
		Object.keys(userProject).forEach((key) => {
			if (Object.hasOwn(sysProject, key)) {
				if (isType(sysProject[key]) !== isType(userProject[key])) {
					throw new TypeError(`"${userProject[key]}" 类型不匹配 !`)
				}
				sysProject[key] = userProject[key]
			}
		})
	}
}
