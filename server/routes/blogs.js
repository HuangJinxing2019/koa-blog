const router = require('koa-router')({prefix: '/blogs'})
const blogsController = require('../controller/BlogsController')

const { verifyCheckin, pageFormat } = require('../middleware')

router.post('/queryBlogsListPage', verifyCheckin, pageFormat, blogsController.queryListPage)
router.post('/createBlogs', verifyCheckin, blogsController.createBlogs)
router.post('/deleteBlogs', verifyCheckin, blogsController.deleteBlogs)

module.exports = router
