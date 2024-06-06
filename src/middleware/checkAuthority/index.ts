import { type Context, type Next } from 'koa'
import { CheckAuthority } from '#systemLib'

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
		await next()
		return

		const result = checkAuthority.check({
			method: ctx.method,
			ruleName: 'admin',
			url: ctx.url
		})

		if (result) {
			await next()
			return
		}

		ctx.body = {
			code: 403,
			msg: '权限不足'
		}
	}
}
