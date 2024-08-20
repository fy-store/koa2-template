import setConfig from '../config/index.js'

export default async () => {
	await setConfig()
	// @ts-ignore
	const config = await import('../../project.config.js')
	if (config.default?.beforeLoad) {
		if (typeof config.default.beforeLoad !== 'function') {
			throw new TypeError('beforeLoad 配置必须是一个函数 !')
		}

		await config.default.beforeLoad()
	}
}
