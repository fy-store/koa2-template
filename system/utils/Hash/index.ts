import bcrypt from 'bcrypt'

/**
 * 该模块适合密码储存入数据库前使用
 */
class Hash {
	#key: string
	#startKey: string
	#endKey: string
	#salt: number

	/**
	 * 创建一个hash算法实例, 该模块适合密码储存入数据库前使用
	 * @param key 加密的 key 值
	 * @param salt 加密盐轮(数值过大可能会影响性能), 默认为 10 [可选]
	 */
	constructor(key: string, salt: number = 10) {
		if (typeof key !== 'string') {
			throw new TypeError('key must be a string')
		}

		if (typeof salt !== 'number') {
			throw new TypeError('salt must be a number')
		}

		this.#key = key
		this.#salt = salt
		this.#startKey = key.substring(0, Math.floor(key.length / 2))
		this.#endKey = key.substring(this.#startKey.length)
	}

	/**
	 * 加密
	 * @param str 需要加密的字符串
	 * @returns hash 后的字符串
	 */
	async encryp(str: string): Promise<string> {
		return await bcrypt.hash(this.#startKey + str + this.#endKey, this.#salt)
	}

	/**
	 * 验证是否通过(验证明文 str hash 后是否同 hashStr 一致)
	 * @param str 需要验证的明文字符串
	 * @param hashStr 已被加密过的字符串
	 */
	async verify(str: string, hashStr: string): Promise<boolean> {
		return await bcrypt.compare(this.#startKey + str + this.#endKey, hashStr)
	}
}

export default Hash
