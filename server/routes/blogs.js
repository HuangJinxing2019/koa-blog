const router = require('koa-router')({prefix: '/blogs'})

const { verifyCheckin } = require('../middleware')
router.post('/queryList', verifyCheckin, (ctx) => {
  ctx.body = ctx.request.userInfo
})

module.exports = router
