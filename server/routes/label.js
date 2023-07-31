const router = require('koa-router')({prefix: '/label'})
const { verifyCheckin, pageFormat } = require('../middleware')

const labelController = require('../controller/LabelController')

router.post('/createLabel', verifyCheckin, labelController.createLabel)
router.post('/updateLabel', verifyCheckin, labelController.updateLabel)
router.post('/queryLabelPage', verifyCheckin, pageFormat, labelController.queryLabelPage)
router.post('/deleteLabel', verifyCheckin, labelController.deleteLabel)

module.exports = router
