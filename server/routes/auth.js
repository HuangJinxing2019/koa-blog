const router = require('koa-router')({prefix: '/auth'})

const AuthController = require('../controller/AuthController')

const authController = new AuthController()
router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/checkToken', authController.checkToken)

module.exports = router
