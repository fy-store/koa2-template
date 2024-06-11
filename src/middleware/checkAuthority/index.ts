import { type Context, type Next } from 'koa'
import { CheckAuthority } from '#systemLib'
import { session } from '#lib'

const checkAuthority = new CheckAuthority({
	baseURL: '/api',
	router: {
		admin: [
			{
				url: '/admin',
				method: '*',
				match: 'startWith'
			}
		]
	},
	whiteList: [
		{
			method: '*',
			url: '/login',
			match: 'startWith'
		}
	]
})

export default () => {
	return async (ctx: Context, next: Next) => {
		ctx.sessionId = ctx.header.authorization
		ctx.session = session.get(ctx.header.authorization)

		// 如果接口在白名单内
		if (checkAuthority.checkWhiteList({ method: ctx.method, url: ctx.url })) {
			await next()
			return
		}

		// 不在白名单内则验证会话和路由权限
		if (!ctx.session) {
			ctx.body = {
				code: 401,
				msg: '登录过期'
			}
			return
		}

		const checkResult = checkAuthority.checkRoute({
			url: ctx.url,
			method: ctx.method,
			ruleName: ctx.session.identity as string
		})

		if (!checkResult) {
			console.log(ctx.session)
			ctx.body = {
				code: 403,
				msg: '权限不足'
			}
			return
		}

		await next()
	}
}
