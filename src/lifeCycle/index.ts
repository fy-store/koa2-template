import { type TCallback } from '@system/types/lifeCycle.js'
import beforeInit from './beforeInit.js'
import inited from './inited.js'
import mounted from './mounted.js'

/**
 * 生命周期钩子, 支持异步等待
 */
export default {
	beforeInit,
	inited,
	mounted
} as TCallback
