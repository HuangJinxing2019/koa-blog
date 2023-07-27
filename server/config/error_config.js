module.exports = {
  SUCCESS: {
    code: 200,
    msg: '成功',
  },
  NOT_LOGIN: {
      code: 40001,
      msg: '未登录',
  },
  LOGIN_INVALIDATION:{
      code: 40001,
      msg: '登录失效'
  },
  UNKNOWN_ERROR: {
    code: 40002,
    msg: '未知错误，请联系管理员'
  },
  PARAMS_ERROR: {
    code: 40002,
    msg: '参数错误'
  },
  UPLOAD_ERROR:{
    code: 40003,
    msg: '文件上传失败'
  },
  NOT_FOUND_ERROR:{
    code: 404,
    msg: '文件数据找不到'
  },
}
