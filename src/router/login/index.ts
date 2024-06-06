import Router from 'koa-router'
import { authorization } from '#systemLib'

const router = new Router({ prefix: '/login' })
export default router

const account = 'root'
const password = '123456'

router.get('/', async (ctx) => {
	ctx.body = {
		code: 0,
		msg: '测试账号和密码获取成功',
		data: {
			account,
			password
		}
	}
})

router.post('/', async (ctx) => {
	if (ctx.body.account === account && ctx.body.password === password) {
		const token = await authorization.createToken({ identity: 'test', id: 1 })
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
		msg: '账号或密码有误, 请用 GET 访问 /api/login 获取测试账号和密码'
	}
})
