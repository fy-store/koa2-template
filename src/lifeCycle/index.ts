import { type lifeCycle } from '#sysType'
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
} as lifeCycle.LifeCycle
