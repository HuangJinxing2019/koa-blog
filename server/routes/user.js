const router = require('koa-router')({prefix: '/user'})
const userController = require('../controller/UserController')
const { verifyCheckin } = require('../middleware')

router.post('/queryUserInfo', userController.queryUserInfo)
router.post('/update', userController.update)

module.exports = router
