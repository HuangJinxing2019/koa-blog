const jwt = require('jsonwebtoken')
const { PARAMS_ERROR, SUCCESS, UNKNOWN_ERROR } = require('../config/error_config');
const { returnInfo } = require('../libs/utils')
const { REG_MOBILE, REG_PWD } = require('../config/reg_config')
const { PRIVATE_KEY } = require('../config/encryption_config')

const sysUserService = require('../services/SysUserService')
class AuthController {
  login(ctx){

  }
  async register(ctx){
    const { account, password, nickname } = ctx.request.body;
    if(!REG_MOBILE.test(account))
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: account ? '手机号不正确' : '账号不能为空'})
    if(!REG_PWD.test(password))
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: password ? '请输入8~16位带有大小写字母数字特殊字符' : '密码不能为空'})
    if(!nickname)
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: '昵称不能为空'})
    try {
      const res = await sysUserService.createSysUser({account, password, nickname})
      const token = await jwt.sign({ account }, PRIVATE_KEY, { expiresIn: 60 * 60})
      ctx.body = returnInfo(SUCCESS, { ...res.dataValues, token })
    } catch (err) {
      console.log(err)
      ctx.body = returnInfo(typeof err === 'string' ? { ...UNKNOWN_ERROR, msg: err } : UNKNOWN_ERROR)
    }
  }
}

module.exports = AuthController
