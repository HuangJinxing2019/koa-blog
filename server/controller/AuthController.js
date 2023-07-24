const sysUserService = require('../services/SysUserService')

const { PARAMS_ERROR, SUCCESS, UNKNOWN_ERROR } = require('../config/error_config');
const { returnInfo, genToken, verifyToken} = require('../libs/utils')
const { REG_MOBILE, REG_PWD } = require('../config/reg_config')

class AuthController {

  // 登录
  async login(ctx){
    const { account, password } = ctx.request.body;

    // 参数校验
    if(!REG_MOBILE.test(account))
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: account ? '手机号不正确' : '账号不能为空'})
    if(!REG_PWD.test(password))
      return ctx.body = returnInfo({...PARAMS_ERROR, msg: password ? '请输入8~16位带有大小写字母数字特殊字符' : '密码不能为空'})

    try {
      // 根据账号查询用户信息
      const userInfo = await sysUserService.queryAccountUserInfo(account);
      // 判断用户是否存在，密码是否正确
      if (!userInfo) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '账号不存在' })
      if (userInfo.dataValues.password !== password) return  ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '密码不正确' });

      // 使用账号生成token
      const token = await genToken({ account })
      ctx.cookies.set('token', token)

      // 返回登录信息
      ctx.body = returnInfo(SUCCESS, { ...userInfo.dataValues, token })

    } catch (err) {
      console.log(err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }

  // 注册
  async register(ctx){
    const { account, password, nickname } = ctx.request.body;

    if(!REG_MOBILE.test(account))
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: account ? '手机号不正确' : '账号不能为空'})
    if(!REG_PWD.test(password))
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: password ? '请输入8~16位带有大小写字母数字特殊字符' : '密码不能为空'})
    if(!nickname)
      return  ctx.body = returnInfo({...PARAMS_ERROR, msg: '昵称不能为空'})

    try {
      const userInfo = await sysUserService.createSysUser({account, password, nickname})
      const token = await genToken({ account })
      ctx.cookies.set('token', token)
      ctx.body = returnInfo(SUCCESS, { ...userInfo.dataValues, token })

    } catch (err) {
      console.log(err)
      ctx.body = returnInfo(typeof err === 'string' ? { ...UNKNOWN_ERROR, msg: err } : UNKNOWN_ERROR)
    }
  }

  async checkToken(ctx){
    const { token } = ctx.request.body
    try {
      await verifyToken(token);
      ctx.body = returnInfo({code: 200, msg: ''}, { data: true })
    } catch (err) {
      ctx.body = returnInfo({code: 200, msg: 'token无效'}, {data: false})
    }
  }
}

module.exports = new AuthController()
