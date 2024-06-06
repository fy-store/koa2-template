declare global {
	/**
	 * 配置对象
	 */
	var systemConfig: {
		/**
		 * 根目录绝对路径
		 */
		rootPath: string
		/**
		 * 根目录绝对路径
		 */
		env: 'production' | 'development'
		/**
		 * 当前ip
		 */
		ip: string
		/**
		 * 颜色配置
		 */
		color: {
			danger: string
			warning: string
			normal: string
			success: string
		}
		/**
		 * 开发环境配置
		 */
		dev: {
			success: string
			fail: string
			publicPath: string
		}
	}
}

export {}
