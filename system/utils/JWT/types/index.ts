import { type VerifyOptions as v } from 'jsonwebtoken'
export { type SignOptions, JwtPayload } from 'jsonwebtoken'

export type VerifyOptions = v & {
	complete?: false
}

export type Options = {
	/** key 值, 默认随机生成一个 [可选] */
	key?: string
	/** 过期时间, 单位秒, 默认为 86400(一天) [可选] */
	effectiveTime?: number
	/** 验证Token 时是否校验过期时间, 默认为 true [可选] */
	verifyTime?: boolean
}
