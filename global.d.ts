declare global {
	/** 配置对象 */
	var config: {
		project: {
			/** 接口起始路径 */
			api: string
			/** 前端静态资源 */
			webPath: string
			/** 会话配置 */
			session: {
				/** 有效时间(单位毫秒) */
				maxAge: number
				/** 活跃状态自动延长 */
				activeExtend: boolean
			}
		}

		/** mysql 数据库配置 */
		mysql: {
			/** 数据库主机 */
			host: string
			/** 数据库端口 */
			port: number
			/** 连接的数据库 */
			database: string
			/** 连接用户 */
			user: string
			/** 连接密码 */
			password: string
		}

		/** 阿里 oss 配置 */
		aliOss: {
			/** 临时凭证所需配置 */
			sts: {
				/** 用户 accessKeyId */
				accessKeyId: string
				/** 用户 accessKeySecret */
				accessKeySecret: string
				/** 角色 roleArn */
				roleArn: string
				/** 自定义权限策略，用于进一步限制 STS 临时访问凭证的权限 */
				policy: string | object
				/** 临时访问凭证有效时间单位为秒(取值最小15分钟) */
				expirationSeconds: number
			}

			/** 客户端操作所需配置 */
			client: {
				/** Bucket 所在地域 */
				region: string
				/** 存储空间名称 */
				bucket: string
			}
		}
	}
}

export {}
