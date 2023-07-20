const sysUserModel = require('../db/models/sys_user')
const { Op } = require("sequelize");

class SysUserService{
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
}
module.exports = new SysUserService()
