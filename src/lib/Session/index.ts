import { nanoid } from 'nanoid'
import { isType, readOnly } from 'assist-tools'
import { set, type PropertyPath } from 'lodash-es'
import { TConfig, TEatch, TJSON } from './types/index.js'

export default class Session {
	#sign: any
	#config: TConfig
	#sessionStore = new Map<string, Record<string, any>>()

	get sessionStore() {
		return readOnly(this.#sessionStore, { unReadOnly: true, sign: this.#sign })
	}

	/**
	 * 创建一个会话实例
	 * @param sign 实例唯一标识
	 */
	constructor(config: TConfig = {}) {
		this.#config = config
		this.#sign = config.sign ?? Symbol()
	}

	/**
	 * 创建一个当前实例唯一的会话id
	 */
	#createId() {
		let id = nanoid()
		while (1) {
			if (this.#sessionStore.has(id)) {
				id = nanoid()
			} else {
				return id
			}
		}
	}

	#cloneData<T extends TJSON>(content: T): T {
		const type = isType(content)
		if (!(type === 'array' || type === 'object')) {
			throw new TypeError(`"content" must be an array or object !`)
		}
		return JSON.parse(JSON.stringify(content))
	}

	/**
	 * 创建一个会话
	 * @param content 会话内容
	 * @returns 会话 ID
	 */
	async create(content: TJSON = {}) {
		const newContent = this.#cloneData(content)
		const id = this.#createId()
		this.#sessionStore.set(id, newContent)
		return id
	}

	#get(id: string) {
		if (!this.#sessionStore.has(id)) {
			throw new Error(`sessionStore is not a session "${String(id)}" !`)
		}

		return this.#sessionStore.get(id)
	}

	/**
	 * 获取指定会话
	 * @param id 会话 ID
	 * @returns 会话内容
	 */
	get(id: string) {
		return readOnly(this.#get(id), { unReadOnly: true, sign: this.#sign })
	}

	/**
	 * 更新会话内指定数据
	 * @param id 会话 ID
	 * @param prop 属性路径, 示例: a[0].b.c
	 * @param value 新的内容
	 * @returns 更新后的数据
	 */
	async update(id: string, prop: PropertyPath, value: TJSON | number | string | boolean | null) {
		const type = isType(value)
		let content: unknown
		if (type === 'array' || type === 'object') {
			content = this.#cloneData(value as TJSON)
		} else {
			const allow = ['number', 'string', 'boolean', 'null']
			if (!allow.includes(type)) {
				console.log(type)
				throw new TypeError(`"value" must be an array or object or number, string, boolean, null !`)
			}
			content = value
		}

		set(this.#get(id), prop, content)
		return this.get(id)
	}

	/**
	 * 重新设置会话内容(替换整个会话)
	 * @param id 会话 ID
	 * @param data 新的数据
	 * @returns 新的会话
	 */
	async set(id: string, data: TJSON) {
		const newData = this.#cloneData(data)
		this.#sessionStore.set(id, newData)
		return this.get(id)
	}

	/**
	 * 删除会话
	 * @param id 会话 ID
	 */
	async delete(id: string) {
		return this.#sessionStore.delete(id)
	}

	/**
	 * 迭代会话仓库
	 * @param callback 回调函数
	 */
	eatch(callback: TEatch) {
		Array.from(this.#sessionStore).forEach((value, index) => {
			callback.call(
				this,
				readOnly(value, { sign: this.#sign, unReadOnly: true }),
				index,
				readOnly(this.#sessionStore, { sign: this.#sign, unReadOnly: true })
			)
		})
		return this
	}
}

const session = new Session()
const id = await session.create({
	a: 1,
	b: 2
})

session.set(id, {
	c: 2,
	d: 3
})

session.update(id, 'f', [1, 2, 3])
session.update(id, 'f[3]', [1, 2, 3])

// console.log(session.sessionStore)
