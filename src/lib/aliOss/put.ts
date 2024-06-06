import OSS from 'ali-oss'
import createClient from './createClient.js'
import { TOptions } from './getTempToken.js'

/**
 * 简单上传
 * @param filename 文件的名称
 * @param file 文件(文件路径 / Buffer)
 * @param config 上传文件的配置选项 [可选]
 * @param tokenOptions 获取临时凭证的配置选项 [可选]
 */
export default async (
	filename: string,
	file: string | Buffer,
	config?: OSS.PutObjectOptions,
	tokenOptions?: TOptions
) => {
	const client = await createClient(tokenOptions)
	return client.put(filename, file, config)
}
