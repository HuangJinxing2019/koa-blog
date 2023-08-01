const router = require('koa-router')({prefix: '/category'})
const { verifyCheckin, pageFormat } = require('../middleware')

const categoryController = require('../controller/CategoryController')

router.post('/createCategory', verifyCheckin, categoryController.createCategory)
router.post('/updateCategory', verifyCheckin, categoryController.updateCategory)
router.post('/queryCategoryPage', verifyCheckin, pageFormat, categoryController.queryCategoryPage)
router.post('/queryCategoryListAll', verifyCheckin, categoryController.queryCategoryListAll)
router.post('/deleteCategory', verifyCheckin, categoryController.deleteCategory)

module.exports = router
