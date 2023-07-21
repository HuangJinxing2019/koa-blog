const sysUserModel = require('../db/models/sys_user')
const { Op } = require("sequelize");


class SysUserService{

  // 注册用户
  async createSysUser(sysUser) {
    const { nickname, account } = sysUser
    const result = await sysUserModel.findOne({
      where: {
        [Op.or]: { nickname, account }
      }
    })
    if(result){
      let errMsg;
      if(result.account === account){
        errMsg = '账号已存在'
      } else {
        errMsg = '昵称已存在'
      }
      return Promise.reject(errMsg)
    }
    return sysUserModel.create(sysUser);
  }

  // 根据账号查询用户
  async queryAccountUserInfo(account){
    return sysUserModel.findOne({
      where: { account }
    })
  }
}
module.exports = new SysUserService()
