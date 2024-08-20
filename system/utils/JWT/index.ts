import jwt from 'jsonwebtoken'
import randomKey from '../randomKey/index.js'
import { setDefaultData, getProperty } from 'assist-tools'
import { type Options, SignOptions, VerifyOptions, JwtPayload } from './types/index.js'

class JWT {
	#config: Required<Options>

	/**
	 * 创建一个 JWT 实例
	 * @param options 配置对象
	 */
	constructor(options: Options = {}) {
		setDefaultData(
			{ a: 1, b: 2 },
			{
				a: 2
			}
		)
		const parmas = getProperty(options, ['key', 'effectiveTime', 'verifyTime'], false)
		const config = setDefaultData(parmas, {
			key: randomKey(32),
			effectiveTime: 86400,
			verifyTime: true
		})

		if (typeof config.key !== 'string') {
			throw new TypeError('jwtKey must be a string or null !')
		}

		if (typeof config.effectiveTime !== 'number') {
			throw new TypeError('jwtEffectiveTime must be a number !')
		}

		if (typeof config.verifyTime !== 'boolean') {
			throw new TypeError('jwtVerifyTime must be a boolean !')
		}

		this.#config = config
	}

	/**
	 * 生成一个 Token
	 * @param data - 需要保存在 Token 里的数据
	 * @param options - 生成 Token 的配置选项
	 * @returns 一个符合JWT规范的字符串
	 */
	createToken(data: string | Buffer | object = {}, options: SignOptions = {}): Promise<string> {
		const parmas = {
			expiresIn: this.#config.effectiveTime,
			...options
		}

		return new Promise((resolve, reject) => {
			jwt.sign(data, this.#config.key, parmas, (err, encoded) => {
				if (err) {
					reject(err)
				} else {
					resolve(encoded)
				}
			})
		})
	}

	/**
	 * 验证一个 Token
	 * @param token - 需要验证的 token
	 * @param options - 验证的配置选项
	 * @returns 若验证通过则返回解析后的配置
	 */
	verifyToken(token: string, options: VerifyOptions = {}): Promise<string | JwtPayload> {
		const parmas = {
			ignoreExpiration: !this.#config.verifyTime,
			...options
		}

		return new Promise((resolve, reject) => {
			jwt.verify(token, this.#config.key, parmas, (err, decoded) => {
				if (err) {
					reject(err)
				} else {
					resolve(decoded)
				}
			})
		})
	}
}

export default JWT
