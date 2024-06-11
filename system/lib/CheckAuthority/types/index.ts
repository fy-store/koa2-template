export type TMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

type TMatchRule = {
	url: string
	method: TMethod[]
}

/**
 * 自定义规则
 */
export interface TCustomMatch {
	(url: string, method: TMethod | string, rule: TMatchRule): boolean
}

export interface TRule {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: '*' | TMethod | TMethod[]
	/**
	 * 匹配规则
	 * - default 严格相等(默认值)
	 * - include 包含
	 * - startWith 以其开头
	 * - 函数 接收三个参数, url, method, rule 返回一个 boolean
	 */
	match?: TCustomMatch | 'default' | 'startWith' | 'include'
}

export interface TRouterItem {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: '*' | TMethod | TMethod[]
	/**
	 * 匹配规则
	 * - 函数 接收三个参数, url, method, rule 返回一个 boolean
	 */
	match?: TCustomMatch
}

export interface TParseRouterItem {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: TMethod[]
	/**
	 * 匹配规则
	 */
	match?: TCustomMatch
}

/**
 * 路由配置
 */
export interface TRouter {
	[key: string]: TRouterItem[]
}

/**
 * 解析后的路由配置
 */
export interface TParseRouter {
	[key: string]: TParseRouterItem[]
}

/**
 * 配置对象
 */
export interface TConfig {
	/**
	 * 基础路径, 默认为 '/' , 配置该项后, route 和 whiteList 中的 url 可省略基础路径
	 */
	baseURL?: string
	/**
	 * 路由规则
	 */
	router?: {
		[key: string]: TRule[]
	}
	/**
	 * 白名单路由规则
	 */
	whiteList?: TRule[]
}

/**
 * 验证配置
 */
export interface TCheck<T> {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: TMethod | string
	/**
	 * 使用的规则(配置对象 router 的 key)
	 */
	ruleName: T | string
}

/**
 * 格式化 rule
 */
export interface TFormatRule {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: TMethod[]
	/**
	 * 匹配规则
	 * - default 严格相等(默认值)
	 * - include 包含
	 * - startWith 以其开头
	 * - 函数 接收三个参数, url, method, rule 返回一个 boolean
	 */
	match: TCustomMatch
}

/**
 * 规则处理
 */
export interface TMatchMap {
	[key: string]: {
		(url: string, method: TMethod, rule: TRule): boolean
	}
}

/**
 * 提取 router 中的 key
 */
export type extractRouterKeys<T> = T extends { router: Record<infer K, any> } ? K : never

/**
 * 白名单验证配置
 */
export interface TCheckWhiteListConfig {
	url: string
	method: TMethod | string
}
