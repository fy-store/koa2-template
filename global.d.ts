declare global {
	/**
	 * 配置对象
	 */
	var config: {
		/**
		 * 系统配置
		 */
		system: {
			/**
			 * 项目配置
			 */
			project: {
				/**
				 * 项目挂载端口
				 */
				port: number
			}

			/**
			 * 内置方法配置
			 */
			lib: {
				/**
				 * hash 算法 key 值
				 */
				hashKey: string
				/**
				 *  hash 算法加盐轮数
				 */
				hashSalt: number
				/**
				 * token 配置
				 */
				token: {
					/**
					 * key 值配置
					 */
					key: string | null
					/**
					 * token有效时长(单位秒)
					 */
					effectiveTime: number
					/**
					 * 验证 token 时是验证时间是否过期
					 */
					verifyTime: boolean
				}
			}
			/**
			 * 开发服务器配置
			 */
			dev: {
				/**
				 * 每次重启开发服务时是否清空控制台
				 */
				restartClear: boolean
				/**
				 * 每次启动开发服务时是否清空控制台
				 */
				startClear: boolean
				/**
				 * 每次启动开发服务时是否输出提示
				 */
				startTip: boolean
			}
		}

		project: {
			/**
			 * 接口起始路径
			 */
			api: string
			/**
			 * 前端静态资源
			 */
			webPath: string
		}

		/**
		 * mysql 数据库配置
		 */
		mysql: {
			/**
			 * 数据库主机
			 */
			host: string
			/**
			 * 数据库端口
			 */
			port: number
			/**
			 * 连接的数据库
			 */
			database: string
			/**
			 * 连接用户
			 */
			user: string
			/**
			 * 连接密码
			 */
			password: string
		}

		/**
		 * 阿里 oss 配置
		 */
		aliOss: {
			/**
			 * 临时凭证所需配置
			 */
			sts: {
				/**
				 * 用户 accessKeyId
				 */
				accessKeyId: string
				/**
				 * 用户 accessKeySecret
				 */
				accessKeySecret: string
				/**
				 * 角色 roleArn
				 */
				roleArn: string
				/**
				 * 自定义权限策略，用于进一步限制 STS 临时访问凭证的权限
				 */
				policy: string | object
				/**
				 * 临时访问凭证有效时间单位为秒(取值最小15分钟, 最大1小时)
				 */
				expirationSeconds: number
			}

			/**
			 * 客户端操作所需配置
			 */
			client: {
				/**
				 * 填写Bucket所在地域
				 */
				region: string
				/**
				 * 填写存储空间名称
				 */
				bucket: string
			}
		}
	}
}

export {}
