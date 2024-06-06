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
		return stats.isDirectory()
	} catch (err) {
		if (err.code === 'ENOENT') {
			return false
		} else {
			console.log('Error: ' + err)
			return false
		}
	}
}
