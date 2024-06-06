import ip from 'ip'
import path from 'path'
import { readOnly } from 'assist-tools'
import { parseConfig } from '../utils/index.js'

const rootPath = path.resolve()
const systemPath = path.join(rootPath, 'system')

export const parseSystemConfig = () => {
	const systemConfig = parseConfig<typeof globalThis.systemConfig>(path.join(systemPath, 'config'))

	return {
		rootPath,
		ip: ip.address(),
		env: process.env.NODE_ENV === void 0 ? 'production' : 'development',
		...systemConfig
	}
}

globalThis.systemConfig = readOnly(parseSystemConfig())
