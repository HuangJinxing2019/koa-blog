const path = require('path');
const jwt = require('jsonwebtoken')
const Qiniu = require('qiniu');

const qiniuConfig = require('../config/qiniu_config');
const { PRIVATE_KEY, EXPIRES_IN } = require('../config/encryption_config')

function returnInfo(statusInfo, data = null){
  return {
    ...statusInfo,
    data: data
  }
}

function returnPageData(offset, limit, count = 0, rows = []){
  return {
    pages: Math.ceil(count / limit),
    total: count,
    curPage: (offset / limit) + 1,
    list: rows,
  }
}

async function genToken(data) {
  return await jwt.sign(data, PRIVATE_KEY, { expiresIn: EXPIRES_IN })
}

async function verifyToken(token) {
  return jwt.verify(token, PRIVATE_KEY)
}

async function qiniuUpload(filepath, filename){
  const mac = new Qiniu.auth.digest.Mac(qiniuConfig.ak, qiniuConfig.sk),
      conf = new Qiniu.conf.Config(),
      formUploader = new Qiniu.form_up.FormUploader(conf),
      putExtra = new Qiniu.form_up.PutExtra();

  const token = new Qiniu.rs.PutPolicy({ scope: qiniuConfig.bucket.blogs.bucketName }).uploadToken(mac);
  // 获取上传文件的扩展名
  const extname = path.extname(filename);
  // 生成上传到七牛云的文件名，这里使用时间戳和随机字符串
  const key = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2)}${extname}`;
  return new Promise((resolve, reject) => {
    formUploader.putFile(token, key, filepath, putExtra, (err, ret, info) => {
      if(err){
        reject(err)
      } else {
        if(info.statusCode === 200){
          resolve(ret)
        }else {
          reject(info)
        }
      }
    })
  })
}

function getRandomStr(len){
  const arr = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",

    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",

    "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",

    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",

    "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",

    "3", "4", "5", "6", "7", "8", "9", "-", "&", "@", "!",
    "$","_","+","="
  ];
  let str = '';
  for(let i = 0; i < len; i++){
    str += arr[Math.floor(Math.random() * arr.length)]
  }
  return str
}


module.exports = {
  returnInfo,
  genToken,
  verifyToken,
  getRandomStr,
  qiniuUpload,
  returnPageData
}
