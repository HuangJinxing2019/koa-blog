class FileController{
  upload(ctx){
    console.log('upload')
    console.log(ctx.request.body)
    ctx.body = { code: 200, msg: '成功' }
  }
}

module.exports = new FileController()
