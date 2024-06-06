import createClient from './createClient.js'

/**
 * 简单获取
 * @param filename 文件的名称
 */
export default async (filename: string) => {
	const client = await createClient()
	return client.get(filename)
}
