const router = require('koa-router')({prefix: '/file'});
const multer = require('koa-multer');
const fileController = require('../controller/FileController');
const { verifyCheckin } = require('../middleware');

const upload = multer();

router.post('/upload', verifyCheckin, upload.single('file'), fileController.upload)

module.exports = router
