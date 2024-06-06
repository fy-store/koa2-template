import { type Context, Next } from 'koa'

type TAllowMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'
type TAllowHeader = 'authorization' | 'content-type'
type TExposeHeaders = 'authorization' | 'content-type'

/**
 * 配置对象
 */
interface TOptions {
	/**
	 * 跨域规则 dynamic 或 notAllowed 或 * 或 具体域名, 默认为 dynamic
	 * - dynamic 动态的, 例如请求者为 https://rgbyun.com 那么跨域允许的域名也为 https://rgbyun.com [推荐]
	 * - notAllowed 不允许跨越 [推荐]
	 * - https://rgbyun.com 具体域名 [推荐]
	 * - \* 允许所有域名跨域, 注意若设置为 * 浏览器将不会携带 cookie [不推荐]
	 */
	origin?: 'dynamic' | 'notAllowed' | '*' | string
	/**
	 * 允许跨域请求的方法, 默认为 ['GET', 'POST']
	 * - 使用示例: ['GET', 'POST'] 或 'GET,POST'
	 */
	allowMethods?: TAllowMethods | TAllowMethods[] | string | string[]
	/**
	 * 允许改动的请求头, 默认为 ['authorization', 'content-type']
	 * 使用示例: ['authorization', 'content-type'] 或 'authorization,content-type'
	 */
	allowHeader?: TAllowHeader | TAllowHeader[] | string | string[]
	/**
	 * 下次预检间隔时间, 单位秒, 默认为 86400 (一天)
	 * - 使用示例: 60
	 */
	maxAge?: number
	/**
	 * 是否允许跨域携带凭证(cookie)请求, origin 为 * 时无效, 默认为 true
	 * - 使用示例: true 或 false
	 */
	credentials?: boolean
	/**
	 * 允许js获取的响应头, 默认为 ['authorization'],
	 * - 使用示例: ['authorization', 'content-type'] 或 'authorization,content-type'
	 */
	exposeHeaders?: TExposeHeaders | TExposeHeaders[] | string | string[]
}

/**
 * 跨域处理 cors 中间件
 */
export default (options: TOptions = {}) => {
	const { origin, allowMethods, allowHeader, maxAge, credentials, exposeHeaders } = init(options)

	return async (ctx: Context, next: Next) => {
		if (origin !== 'notAllowed') {
			ctx.set({
				'Access-Control-Allow-Origin': backOrigin(origin, ctx),
				'Access-Control-Allow-Methods': allowMethods,
				'Access-Control-Allow-Headers': allowHeader,
				'Access-Control-Allow-Credentials': String(credentials),
				'Access-Control-Expose-Headers': exposeHeaders
			})

			if (ctx.method === 'OPTIONS') {
				// 预检请求
				ctx.set({
					'Access-Control-Max-Age': String(maxAge)
				})
				ctx.body = null
				return
			}
		}
		await next()
	}
}

const backOrigin = (origin: string, ctx: Context) => {
	if (origin === '*') return '*'
	if (origin === 'dynamic') return ctx.headers.origin
	return origin
}

const init = (options: TOptions) => {
	const {
		origin = 'dynamic',
		allowMethods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'],
		allowHeader = ['authorization', 'content-type'],
		maxAge = 86400,
		credentials = true,
		exposeHeaders = ['authorization']
	} = options

	if (typeof origin !== 'string') {
		throw new TypeError('"origin" must be a string')
	}

	if (!(typeof allowMethods === 'string' || Array.isArray(allowMethods))) {
		throw new TypeError('"allowMethods" must be a string or an array of strings')
	}

	if (!(typeof allowHeader === 'string' || Array.isArray(allowHeader))) {
		throw new TypeError('"allowHeader" must be a string or an array of strings')
	}

	if (!(typeof exposeHeaders === 'string' || Array.isArray(exposeHeaders))) {
		throw new TypeError('"exposeHeaders" must be a string or an array of strings')
	}

	if (!(typeof maxAge === 'string' || typeof maxAge === 'number')) {
		throw new TypeError('"maxAge" must be a string or number')
	}

	return {
		origin,
		allowMethods: typeof allowMethods === 'string' ? allowMethods : allowMethods.join(','),
		allowHeader: typeof allowHeader === 'string' ? allowHeader : allowHeader.join(','),
		exposeHeaders: typeof exposeHeaders === 'string' ? exposeHeaders : exposeHeaders.join(','),
		maxAge,
		credentials
	}
}
