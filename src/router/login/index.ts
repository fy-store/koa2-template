import Router from 'koa-router'
const router = new Router({ prefix: '/login' })
export default router

//  http://127.0.0.1:3323/api/login 访问
router.get('/', async (ctx) => {
	ctx.body = {
		code: 0,
		msg: '测试成功 !'
	}
})
