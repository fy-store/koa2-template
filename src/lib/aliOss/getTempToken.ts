import OSS from 'ali-oss'

let sts: OSS.STS = null
const getSts = () => {
	sts = new OSS.STS({
		accessKeyId: config.aliOss.sts.accessKeyId,
		accessKeySecret: config.aliOss.sts.accessKeySecret
	})
}

interface TAnyOjb {
	[key: string]: any
}

export interface TOptions {
	/**
	 * 自定义权限策略，用于进一步限制STS临时访问凭证的权限, 此参数将覆盖配置文件参数
	 */
	policy?: string | TAnyOjb
	/**
	 * 用于自定义角色会话名称，用来区分不同的令牌(只能英文), 默认为 ''
	 */
	sessionName?: string
}

/**
 * 获取临时凭证
 * @param options 获取临时凭证的配置选项
 */
export default async (options: TOptions = {}) => {
	if (!sts) getSts()
	const { expirationSeconds, policy, roleArn } = config.aliOss.sts
	const result = await sts.assumeRole(roleArn, options.policy ?? policy, expirationSeconds, options.sessionName ?? '')
	return result.credentials
}
