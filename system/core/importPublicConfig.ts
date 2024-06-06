import path from 'path'
import { readOnly } from 'assist-tools'
import { parseConfig } from '../utils/index.js'

const rootPath = path.resolve()

/**
 * 解析公共配置并挂载至全局
 */
const config = parseConfig<typeof globalThis.config>(path.join(rootPath, 'src/config'))
globalThis.config = readOnly(config)
