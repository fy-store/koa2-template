import jwt from 'jsonwebtoken'
import randomKey from '../randomKey/index.js'

let { key, effectiveTime, verifyTime } = config.system.lib.token
if (key === '') key = randomKey(32)

/**
 * 生成一个 Token
 * @param data - 需要保存在 Token 里的数据(符合JSON格式的数据)
 * @param {object} options - 生成 Token 的配置选项
 * @returns {Promise<string>} 一个符合JWT规范的字符串
 */
export const createToken = (
	data: object = {},
	options: jwt.SignOptions = { expiresIn: effectiveTime }
): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign(data, key, options, (err, encoded) => {
			if (err) {
				reject(err)
			} else {
				resolve(encoded)
			}
		})
	})
}

type TOptions = jwt.VerifyOptions & { complete?: false }

/**
 * 验证一个 Token
 * @param token - 需要验证的 token
 * @param options - 验证的配置选项
 * @returns 若验证通过则返回解析后的配置
 */
export const verifyToken = (
	token: string,
	options: TOptions = { ignoreExpiration: !verifyTime }
): Promise<string | jwt.JwtPayload> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, key, options, (err, decoded) => {
			if (err) {
				reject(err)
			} else {
				resolve(decoded)
			}
		})
	})
}
