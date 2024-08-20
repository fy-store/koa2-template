// 该模块用于 session 持久化存储

import { execute } from '#dbConnect'
import { type Session } from '#sysType'

const name = 'session'
export const create = async (id: string, content: Session.JSONData) => {
	const sql = `
        insert into ${name}(
            id, 
            content
        ) 
        values(?, ?)
    `
	return await execute(sql, [id, content])
}

export const remove = async (sessionId: string) => {
	const sql = `
       update ${name} set deleteTime = from_unixtime(?) where id = ? and deleteTime is null
    `
	return await execute(sql, [Date.now() / 1000, sessionId])
}

export const update = async (sessionId: string, sessionContent: Session.JSONData) => {
	const sql = `
       update ${name} set content = ? where id = ? and deleteTime is null
    `
	return await execute(sql, [sessionContent, sessionId])
}

export const get = async () => {
	const sql = `
        select id, content from ${name} where deleteTime is null
    `
	return await execute(sql)
}
