const path = require('path')
const router = require('koa-router')({prefix: '/file'});
const fileController = require('../controller/FileController');
const { verifyCheckin } = require('../middleware');

router.post('/upload', verifyCheckin, fileController.upload)
router.get('/getFile/:filename', fileController.getFile)

module.exports = router
