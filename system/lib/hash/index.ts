import bcrypt from 'bcrypt'
import { isType } from 'assist-tools'
import output from '../output/index.js'

const { hashKey, hashSalt } = globalThis.config.system.lib

if (isType(hashKey) !== 'string') {
	const msg = 'ConfigError: /config/lib.yaml -> "hashKey" must be a string !'
	output.danger(msg)
	throw new TypeError(msg)
}

if (isType(hashSalt) !== 'number') {
	const msg = 'ConfigError: /config/lib.yaml -> "hashSalt" must be a number !'
	output.danger(msg)
	throw new TypeError(msg)
}

const startKey = hashKey.substring(0, Math.floor(hashKey.length / 2))
const endKey = hashKey.substring(startKey.length)

/**
 * 加密
 * @param awaitEncrypStr 需要加密的字符串
 * @returns hash 后的字符串
 */
export const encryp = async (awaitEncrypStr: string): Promise<string> => {
	return await bcrypt.hash(startKey + awaitEncrypStr + endKey, hashSalt)
}

/**
 * 验证是否通过(验证明文hash后是否同hashStr一致)
 * @param awaitVerifyStr 需要验证的明文字符串
 * @param hashStr 已被加密过的字符串
 */
export const verify = async (awaitVerifyStr: string, hashStr: string): Promise<boolean> => {
	return await bcrypt.compare(startKey + awaitVerifyStr + endKey, hashStr)
}
