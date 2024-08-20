/**
 * 定时任务配置
 */
export interface TimedTasksOptions {
	/**
	 * 时, 默认为 0
	 */
	hour?: number
	/**
	 * 分, 默认为 0
	 */
	minute?: number
	/**
	 * 秒, 默认为 0
	 */
	second?: number
	/**
	 * 毫秒, 默认为 0
	 */
	millisecond?: number
}