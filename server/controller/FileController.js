const { createReadStream, existsSync } = require('fs')
const path = require('path');
const { returnInfo, qiniuUpload } = require("../libs/utils");

const { NOT_FOUND_ERROR, SUCCESS, UPLOAD_ERROR } = require('../config/error_config')

class FileController{
  async upload(ctx){
    const file = ctx.request.files && ctx.request.files.file;
    // try {
    //   const data = await qiniuUpload(file.filepath, file.newFilename);
    //   ctx.body = returnInfo(SUCCESS,'http://ryg5iafoy.hn-bkt.clouddn.com/' + data.key)
    // } catch (err){
    //   console.log('上传七牛错误'+ err)
    // }
    try {
      if(!file){
        ctx.body = returnInfo(UPLOAD_ERROR)
      }else {
        ctx.status = 200
        ctx.body = returnInfo(SUCCESS,'/api/file/getFile/' + file.newFilename)
      }
    }catch (err){
      console.log('上传文件响应错误：', err)
    }
  }
  getFile(ctx){
    const { filename } = ctx.params
    if(filename){
      // 获取文件名称拼接完整路径
      const filePath = path.join(__dirname, '../uploads/' + filename);
      // 检查文件是否存在
      if(existsSync(filePath)){
        // 创建文件流并响应
        ctx.body = createReadStream(filePath);
      } else {
        ctx.status = 404
        ctx.body = returnInfo(NOT_FOUND_ERROR)
      }

    } else {
      ctx.status = 404
      ctx.body = returnInfo(NOT_FOUND_ERROR)
    }
  }
}

function test(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

module.exports = new FileController()
