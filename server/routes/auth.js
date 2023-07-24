const router = require('koa-router')({prefix: '/auth'})

const authController = require('../controller/AuthController')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/checkToken', authController.checkToken)

module.exports = router
