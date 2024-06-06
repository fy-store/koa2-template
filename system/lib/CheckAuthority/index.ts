import path from 'path'
import { isType, readOnly } from 'assist-tools'
import {
	TRouter,
	TRouterItem,
	TConfig,
	TRule,
	TCheck,
	TMatchMap,
	TFormatRule,
	TMethod,
	extractRouterKeys,
	TParseRouter,
	TParseRouterItem,
	TCustomMatch
} from './types/index.js'

const matchMap: TMatchMap = {
	default(url, method, rule) {
		try {
			if (!rule.method.includes(method)) {
				return false
			}
			if (url === rule.url) {
				return true
			}
		} catch {}
		return false
	},

	startWith(url, method, rule) {
		try {
			if (!rule.method.includes(method)) {
				return false
			}
			if (url.startsWith(rule.url) || url === rule.url) {
				return true
			}
		} catch {}
		return false
	},

	include(url, method, rule) {
		try {
			if (!rule.method.includes(method)) {
				return false
			}
			if (url.includes(rule.url)) {
				return true
			}
		} catch {}
		return false
	}
}

const methodArr: TMethod[] = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']

/**
 * 身份鉴权
 */
class CheckAuthority<T extends TConfig> {
	#baseURL: string
	#router: TParseRouter = {}
	#whiteList: TParseRouterItem[]

	/**
	 * 身份鉴权
	 * @param config 配置对象
     * @example
    new CheckAuthority({
        baseURL: '/api',
        route: {
            admin: [
                {
                    url: '/admin',
                    method: '*',
                    match: 'startWith'
                },
                {
                    url: '/user',
                    method: '*',
                    match: 'startWith'
                }
            ],
            user: [
                {
                    url: '/user',
                    method: 'PUT',
                }
            ]
        },
        whiteList: [
            {
                url: '/login',
                method: '*',
                match: 'startWith'
            },
            {
                url: '/file',
                method: '*',
                match: 'startWith'
            }
        ],
    })
	 */
	constructor(config: T = {} as T) {
		const { baseURL = '/', router = {}, whiteList = [] } = config
		this.#init(baseURL, router, whiteList)
		this.#baseURL = baseURL
		const names = Object.keys(router)
		names.forEach((name) => {
			this.#router[name] = router[name].map((rule) => this.#formatRule(rule))
		})
		this.#whiteList = whiteList.map((rule) => this.#formatRule(rule))
	}

	/**
	 * 获取解析后的配置(只读)
	 */
	get config() {
		return readOnly({
			baseURL: this.#baseURL,
			route: this.#router,
			whiteList: this.#whiteList
		})
	}

	#init(
		baseURL: string,
		route: {
			[key: string]: TRule[]
		},
		whiteList: TRule[]
	) {
		if (isType(baseURL) !== 'string') {
			throw new TypeError('"baseURL" mast be a string')
		}

		if (isType(route) !== 'object') {
			throw new TypeError('"route" mast be a object')
		}

		if (isType(whiteList) !== 'array') {
			throw new TypeError('"whiteList" mast be a array')
		}
	}

	#formatRule(rule: TRule): TFormatRule {
		let { url, method, match = 'default' } = rule

		if (typeof url !== 'string') {
			throw new TypeError('"url" must be a string')
		}
		url = path.join(this.#baseURL, url).replaceAll('\\', '/')

		const err = `"method" must be a * or ${methodArr} or array`
		if (!(typeof method === 'string' || Array.isArray(method))) {
			throw new TypeError(err)
		}

		if (method === '*') {
			method = methodArr
		} else if (typeof method === 'string') {
			method = method.trim().toLocaleUpperCase() as TMethod
			if (!methodArr.includes(method)) {
				throw new TypeError(err)
			}
			method = [method]
		} else if (Array.isArray(method)) {
			method = method.map((item) => {
				const method = String(item).trim().toLocaleUpperCase() as TMethod
				if (!methodArr.includes(method)) {
					throw new TypeError(err)
				}
				return method
			})
		}

		const matchList = ['default', 'startWith', 'include']
		type TMatchList = (typeof matchList)[number]
		if (!(matchList.includes(match as TMatchList) || typeof match === 'function')) {
			throw new TypeError(err)
		}
		if (typeof match !== 'function') {
			match = matchMap[match].bind(this)
		}

		return { url, method, match: match as TCustomMatch }
	}

	/**
	 * 判断路由是否通过校验
	 * @param config 配置对象
	 */
	check(config: TCheck<extractRouterKeys<T>>): boolean {
		let { url, method, ruleName } = config
		method = method.toUpperCase() as TMethod
		const isWhiteList = this.#whiteList.find((rule) =>
			rule.match(url, method, { url: rule.url, method: rule.method })
		)
		if (isWhiteList) return true
		const rules = this.#router[ruleName]
		if (!rules) {
			throw new Error(`CheckAuthority: check - route => "${String(ruleName)}" rules does not exist`)
		}
		const result = rules.find((rule) => rule.match(url, method, { url: rule.url, method: rule.method }))
		return !!result
	}

	/**
	 * 判断路由是否通过路由规则校验
	 * @param config 配置对象
	 */
	checkRoute(config: TCheck<extractRouterKeys<T>>): boolean {
		let { url, method, ruleName } = config
		method = method.toUpperCase() as TMethod
		const rules = this.#router[ruleName]
		if (!rules) {
			throw new Error(`CheckAuthority: checkRoute - route => "${String(ruleName)}" rules does not exist`)
		}
		const result = rules.find((rule) => rule.match(url, method, { url: rule.url, method: rule.method }))
		return !!result
	}

	/**
	 * 判断路由是否通过白名单校验
	 * @param config 配置对象
	 */
	checkWhiteList(config: TCheck<extractRouterKeys<T>>): boolean {
		let { url, method } = config
		method = method.toUpperCase() as TMethod
		const isWhiteList = this.#whiteList.find((rule) =>
			rule.match(url, method, { url: rule.url, method: rule.method })
		)
		return !!isWhiteList
	}
}

export default CheckAuthority
