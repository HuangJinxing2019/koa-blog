const SysCategoryModel = require('../db/models/sys_category')
const { Op } = require('sequelize')
class SysCategoryService{

  async queryList({ offset, limit, name }){
    return SysCategoryModel.findAndCountAll({
      limit,
      offset,
      raw: true,
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
      },
      raw: true,
    })
    if (!res) {
      return SysCategoryModel.update(data, { where: { id: data.id } })
    }
    return Promise.reject('类型名称已存在')
  }
  async delete(id){
    return SysCategoryModel.destroy({
      where: { id }
    })
  }
}
module.exports = new SysCategoryService()
