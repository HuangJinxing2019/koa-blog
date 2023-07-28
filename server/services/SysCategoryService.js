const SysCategoryModel = require('../db/models/sys_category')
const { Op } = require('sequelize')
class SysCategoryService{

  async queryList({ offset, limit, name }){
    return SysCategoryModel.findAll({
      limit,
      offset
    })
  }
  async create(data){
    const { name, creator } = data
    const res = await SysCategoryModel.findOne({
      where: { name, creator }
    })
    if(res){
      return Promise.reject('类型名称已存在')
    }
    return SysCategoryModel.create(data)
  }
  async update(data){
    const { name, creator, id } = data
    const res = await SysCategoryModel.findOne({
      where: {
        name,
        creator,
        id: {
          [Op.not]: id,
        }
      }
    })
    return SysCategoryService.update(data)
  }
}
module.exports = new SysCategoryService()
