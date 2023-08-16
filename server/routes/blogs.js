const router = require('koa-router')({prefix: '/blogs'})
const blogsController = require('../controller/BlogsController')

const { verifyCheckin, pageFormat, userPageFormat } = require('../middleware')

router.post('/queryBlogsListPage', verifyCheckin, pageFormat, blogsController.queryListPage)
router.post('/queryUserBlogsListPage', userPageFormat, blogsController.queryUserListPage)
router.post('/createBlogs', verifyCheckin, blogsController.createBlogs)
router.post('/deleteBlogs', verifyCheckin, blogsController.deleteBlogs)
router.post('/queryById', verifyCheckin, blogsController.queryById)
router.post('/updateContent', verifyCheckin, blogsController.updateContent)
router.post('/publishBlogs', verifyCheckin, blogsController.publishBlogs)
router.post('/updateOpen', verifyCheckin, blogsController.updateOpen)
router.post('/queryUserById', blogsController.queryUserById)

module.exports = router
