const router = require('koa-router')({prefix: '/auth'})
const { verifyCheckin } = require('../middleware')

const authController = require('../controller/AuthController')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/checkToken', authController.checkToken)
router.post('/logout', verifyCheckin, authController.logout)

module.exports = router
