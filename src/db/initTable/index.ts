import { type TDbCtx } from '../types/index.js'
import session from './session.js'

export default async ({ query }: TDbCtx) => {
	await query(session)
}
