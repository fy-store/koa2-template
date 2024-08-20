import ip from 'ip'
import path from 'path'
import { readOnly } from 'assist-tools'

// 处理环境变量标识
if (process.env.NODE_ENV === void 0) {
	process.env.NODE_ENV = 'production'
}

/** 系统配置 */
const sysConfig = {
	/** 项目根路径 */
	rootPath: path.resolve(),
	/** 当前系统 IP */
	ip: ip.address(),
	/** 当前系统运行环境标识 */
	env: process.env.NODE_ENV,
	/** 项目配置(可覆盖) */
	project: {
		/** 打包目录 */
		dist: '/dist',
		/** 系统控制台输出颜色 */
		colorDanger: '#F56C6C',
		/** 系统控制台输出颜色 */
		colorWarning: '#E6A23C',
		/** 系统控制台输出颜色 */
		colorNormal: '#00adb5',
		/** 系统控制台输出颜色 */
		colorSuccess: '#1bd1a5',
		/** 开发环境配置 */
		devSuccess: '🛠️  服务启动成功 🎉',
		/** 开发环境配置 */
		devFail: '💔 服务启动失败, 请检查 {{port}} 端口是否被占用',
		/** 项目启动端口 */
		port: 3323,
		/** 静态资源目录 */
		publicPath: '/src/public',
		/** 启动项目时清空控制台 */
		startClearConsole: true,
		/** 启动项目成功提示 */
		startSuccessTip: true,
		/**启动项目输出 localhost */
		startOutputLocalhost: true,
		/** 启动项目输出 IP */
		startOutputIP: true,
		/** 启动项目输出启动环境 */
		startOutputENV: true,
		/**重启时清空控制台 */
		restartClearConsole: true,
		/** 重启时输出提示 */
		restartTip: true,
		/** 打包时复制的文件 */
		copyFiles: [] as string[]
	}
}

globalThis.sysConfig = readOnly(sysConfig, 'looseFitting')
export type SysConfig = typeof sysConfig
export default sysConfig
