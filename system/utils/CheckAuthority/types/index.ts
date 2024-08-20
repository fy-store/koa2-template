export type Method = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

export type MatchRule = {
	url: string
	method: Method[]
}

/**
 * 自定义规则
 */
export interface CustomMatch {
	(url: string, method: Method | string, rule: MatchRule): boolean
}

export interface Rule {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: '*' | Method | Method[]
	/**
	 * 匹配规则
	 * - default 严格相等(默认值)
	 * - include 包含
	 * - startWith 以其开头
	 * - 函数 接收三个参数, url, method, rule 返回一个 boolean
	 */
	match?: CustomMatch | 'default' | 'startWith' | 'include'
}

export interface RouterItem {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: '*' | Method | Method[]
	/**
	 * 匹配规则
	 * - 函数 接收三个参数, url, method, rule 返回一个 boolean
	 */
	match?: CustomMatch
}

export interface ParseRouterItem {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: Method[]
	/**
	 * 匹配规则
	 */
	match?: CustomMatch
}

/**
 * 路由配置
 */
export interface Router {
	[key: string]: RouterItem[]
}

/**
 * 解析后的路由配置
 */
export interface ParseRouter {
	[key: string]: ParseRouterItem[]
}

/**
 * 配置对象
 */
export interface Config {
	/**
	 * 基础路径, 默认为 '/' , 配置该项后, route 和 whiteList 中的 url 可省略基础路径
	 */
	baseURL?: string
	/**
	 * 路由规则
	 */
	router?: {
		[key: string]: Rule[]
	}
	/**
	 * 白名单路由规则
	 */
	whiteList?: Rule[]
}

/**
 * 验证配置
 */
export interface Check<T> {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: Method | string
	/**
	 * 使用的规则(配置对象 router 的 key)
	 */
	ruleName: T | string
}

/**
 * 格式化 rule
 */
export interface FormatRule {
	/**
	 * 请求路径
	 */
	url: string
	/**
	 * 请求方法
	 */
	method: Method[]
	/**
	 * 匹配规则
	 * - default 严格相等(默认值)
	 * - include 包含
	 * - startWith 以其开头
	 * - 函数 接收三个参数, url, method, rule 返回一个 boolean
	 */
	match: CustomMatch
}

/**
 * 规则处理
 */
export interface MatchMap {
	[key: string]: {
		(url: string, method: Method, rule: Rule): boolean
	}
}

/**
 * 提取 router 中的 key
 */
export type ExtractRouterKeys<T> = T extends { router: Record<infer K, any> } ? K : never

/**
 * 白名单验证配置
 */
export interface CheckWhiteListConfig {
	url: string
	method: Method | string
}
