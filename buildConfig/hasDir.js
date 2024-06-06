import fs from 'fs'

/**
 * 判断一个目录是否存在
 * @param {string} path 目录路径
 * @returns {boolean}
 */
export default (path) => {
	try {
		// 如果目录不存在会抛出错误
		const stats = fs.statSync(path)
		// 如果 stats 是一个目录，则返回 true，表示目录存在
		return stats.isDirectory()
	} catch (err) {
		// 如果 fs.statSync 抛出了错误，则说明目录不存在
		if (err.code === 'ENOENT') {
			return false
		} else {
			console.log('Error: ' + err)
			return false
		}
	}
}
