import '../core/importSystemConfig.js'
import '../core/importPublicConfig.js'
import chalk from 'chalk'
import clipboard from 'clipboardy'
import { formatDate } from 'assist-tools'
import randomKey from '../utils/randomKey/index.js'

const success = chalk.hex(sysConfig.project.colorSuccess)
const warning = chalk.hex(sysConfig.project.colorWarning)
const key = randomKey()

console.clear()
console.log('🛠️', success('生成成功'), '🎉 🎉 🎉')
console.log('')
console.log('✨', success(formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss')))
console.log('')
try {
	clipboard.writeSync(key)
	console.log('✨', success('已为您写入剪切板'))
} catch (error) {
	console.log('✨', warning('写入剪切板失败, 请手动复制'))
}

console.log('')
console.log('✨', success(key))
console.log('')
