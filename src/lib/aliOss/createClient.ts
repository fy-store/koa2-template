import OSS from 'ali-oss'
import getTempToken, { type TOptions } from './getTempToken.js'

/**
 * 创建一个OSS客户端
 * @param options 获取临时凭证的配置选项
 */
export default async (options?: TOptions) => {
	const token = await getTempToken(options)
	return new OSS({
		region: config.aliOss.client.region,
		bucket: config.aliOss.client.bucket,
		accessKeyId: token.AccessKeyId,
		accessKeySecret: token.AccessKeySecret,
		stsToken: token.SecurityToken,
		// 刷新回调
		async refreshSTSToken() {
			const newToken = await getTempToken(options)
			return {
				accessKeyId: newToken.AccessKeyId,
				accessKeySecret: newToken.AccessKeySecret,
				stsToken: newToken.SecurityToken
			}
		},
		// 刷新间隔时间
		refreshSTSTokenInterval: 60 * 5
	})
}
