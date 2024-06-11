import { Session } from '#systemLib'
import { session as sessionStore } from '#db'

const session = new Session({
	async onCreate(id, content) {
		await sessionStore.create(id, content)
	},

	async onDelete(id) {
		await sessionStore.remove(id)
	},

	async onUpdate(ctx) {
		await sessionStore.update(ctx.id, ctx.newData)
	},

	async onSet(id, data) {
		await sessionStore.update(id, data)
	}
})

const sessionList = await sessionStore.get()
sessionList[0].forEach((sessionItem) => {
	session.load(sessionItem.id, sessionItem.content)
})

export default session
