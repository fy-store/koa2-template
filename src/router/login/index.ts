import Router from 'koa-router'
import { session } from '#lib'
import { formatDate } from 'assist-tools'

const router = new Router({ prefix: '/login' })
export default router

const account = 'root'
const password = '123456'

router.get('/', async (ctx) => {
	const sessionList = []
	session.eatch(([id, content]) => {
		sessionList.push({ id, content })
	})
	ctx.body = {
		code: 0,
		msg: '测试账号和密码获取成功',
		data: {
			account,
			password,
			session: ctx.session,
			sessionList
		}
	}
})

router.post('/', async (ctx) => {
	if (ctx.request.body.account === account && ctx.request.body.password === password) {
		const now = new Date()
		const token = await session.create({
			identity: 'admin',
			createTime: formatDate(now),
			lastActiveTime: formatDate(now)
		})

		// 此处是直接将会话ID作为Token, 你也可以将会话ID进行加密, 或结合JWT等方案使用
		ctx.body = {
			code: 0,
			msg: '登录成功',
			data: {
				token
			}
		}
		return
	}

	ctx.body = {
		code: 1,
		msg: `账号或密码有误, 请用 GET 访问 http://127.0.0.1:${config.system.project.port}/api/login 获取测试账号和密码`
	}
})
