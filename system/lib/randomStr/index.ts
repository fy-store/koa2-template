const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const getCode = () => {
	return random(2, 36).toString(36)
}

/**
 * 获取一个指定长度的字符串(0-9-a-z)
 * @param num  指定字符长度 , 若为 0 或不传将返回一个空串
 * @return 返回一个指定长度的随机字符串
 */
export default (num: number = 0) => {
	let result = ''
	while (result.length < +num) {
		result += getCode()
	}
	return result
}
