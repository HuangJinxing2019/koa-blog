const sysUserModel = require('../db/models/sys_user')
const { Op } = require("sequelize");
const { getRandomStr } = require("../libs/utils");


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
    const openid = await this.genOpenid();
    return sysUserModel.create({ openid, ...sysUser });
  }

  // 根据账号查询用户
  async queryAccountUserInfo(account){
    return sysUserModel.findOne({
      where: { account }
    })
  }
  async queryUserInfo(data){
    return sysUserModel.findOne({
      where: data,
      raw: true,
    })
  }
  // 生成openid并校验是数据库否已经存在
  async genOpenid(){
    const openid = getRandomStr(8);
    const checkOpenid = await sysUserModel.findOne({
      where: {
        openid,
      }
    })
    if(checkOpenid){
      return this.genOpenid()
    } else {
      return openid
    }
  }
}
module.exports = new SysUserService()
