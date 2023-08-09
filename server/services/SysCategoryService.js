const SysCategoryModel = require('../db/models/sys_category')
const { Op } = require('sequelize')
class SysCategoryService{

  async queryList({ offset, limit, whereData }){
    return SysCategoryModel.findAndCountAll({
      where: whereData,
      limit,
      offset,
      raw: true,
    })
  }
  async queryListAll(){
    return SysCategoryModel.findAll({ raw: true })
  }
  async create(data){
    const { name, creator } = data
    const res = await SysCategoryModel.findOne({
      where: { name, creator },
      raw: true,
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

  // 设置数量。type为create 文章创建，update文章权限更新, delete文章删除。
  async setCount({ id, open, status, type }){
    try {
      if(type === 'create') {
        if (open && status === 1) await SysCategoryModel.increment({ count: 1, openCount: 1 }, { where: { id } })
        else await SysCategoryModel.increment({ count: 1 }, { where: { id } })
      } else if(type === 'update') {
        if(open && status === 1) await SysCategoryModel.increment({ openCount: 1 }, { where: { id } })
        else await SysCategoryModel.increment({ openCount: -1 }, { where: { id } })
      } else if(type === 'delete'){
        if (open && status === 1) await SysCategoryModel.increment({ count: -1, openCount: -1 }, { where: { id } })
        else await SysCategoryModel.increment({ count: -1 }, { where: { id } })
      }
    } catch (err){
      return Promise.reject(err)
    }
  }
}
module.exports = new SysCategoryService()
