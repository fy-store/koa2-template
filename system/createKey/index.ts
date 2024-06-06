import chalk from 'chalk'
import clipboard from 'clipboardy'
import { formatDate } from 'assist-tools'
import '@system/core/importPublicConfig.js'
import '@system/core/importSystemConfig.js'
import { randomKey } from '#systemLib'

const success = chalk.hex(globalThis.systemConfig.color.success)
const warning = chalk.hex(globalThis.systemConfig.color.warning)
const key = randomKey()

console.clear()
console.log('')
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
