const sysUserService = require('../services/SysUserService')
const { UNKNOWN_ERROR, SUCCESS, PARAMS_ERROR } = require('../config/error_config')
const { returnInfo } = require('../libs/utils')
class UserController {
  async queryUserInfo(ctx){
    const { openid, id } = ctx.request.body
    if(!openid && !id) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '缺少参数'})
    let params = {}
    openid && (params.openid = openid)
    id && (params.id = id)
    try {
      const res = await sysUserService.queryUserInfo(params)
      ctx.body = returnInfo(SUCCESS, res)
    }catch (err){
      console.log('获取用户信息失败', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }

}
module.exports = new UserController();
