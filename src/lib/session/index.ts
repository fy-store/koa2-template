// 打开注释可以开启持久化(基于MySQL)
import { Session, timedTask } from '#systemLib'
// import { session as sessionStore } from '#db'

const session = new Session({
	// async onCreate(id, content) {
	// 	await sessionStore.create(id, content)
	// },
	// async onDelete(id) {
	// 	await sessionStore.remove(id)
	// },
	// async onUpdate(ctx) {
	// 	await sessionStore.update(ctx.id, ctx.newData)
	// },
	// async onSet(id, data) {
	// 	await sessionStore.update(id, data)
	// }
})

// const sessionList = await sessionStore.get()
// sessionList[0].forEach((sessionItem) => {
// 	session.load(sessionItem.id, sessionItem.content)
// })

// 每晚两点定时清除已到期会话
timedTask(
	async () => {
		const nowTimer = new Date().getTime()
		const pArr = []
		session.eatch(([id, content]) => {
			if (new Date(content.lastActiveTime as string).getTime() + config.project.session.maxAge < nowTimer) {
				// 会话已过期
				pArr.push(session.delete(id))
			}
		})

		await Promise.all(pArr)
	},
	{ hour: 2 }
)
export default session
