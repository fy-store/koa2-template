/**
 * 定时任务配置
 */
export interface TTimedTasksOptions {
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

/**
 * 每日定时任务
 * @param callback 到点回调, 回调内发生错误不会影响下一次执行, 回调接收一个 clearTimer() 方法, 调用该函数即可停止下一次任务
 * @param options 配置选项
 * @returns 一个函数, 调用该函数即可停止任务
 */
const timedTask = (callback: Function, options?: TTimedTasksOptions) => {
	let ctx = {
		isNext: true,
		timer: null as NodeJS.Timeout | null
	}

	const clearTimer = () => {
		ctx.isNext = false
		clearTimeout(ctx.timer)
	}

	const func = (callback: Function, options: TTimedTasksOptions = {}) => {
		const config = {
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			...options
		}
		const now = new Date()
		const nowTime = now.getTime()
		const clear = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			config.hour,
			config.minute,
			config.second,
			config.millisecond
		)

		let clearTime = clear.getTime()

		// 如果设定的时间点已经过了今天的时间点，设定为明天的时间点
		if (clearTime <= nowTime) {
			clear.setDate(clear.getDate() + 1)
			clearTime = clear.getTime()
		}

		ctx.timer = setTimeout(async () => {
			try {
				await callback(clearTimer)
			} catch (error) {
				console.error(error)
			}
			ctx.isNext && func(callback, config)
		}, clearTime - nowTime)
	}

	func(callback, options)
	return clearTimer
}

export default timedTask
