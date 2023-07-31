const  sysLabelModel = require('../db/models/sys_label');
const { Op } = require('sequelize')
class SysLabelService{

  async queryList ({ offset, limit, whereData }){
    return sysLabelModel.findAndCountAll({
      where: whereData,
      limit,
      offset,
      raw: true,
    })
  }
  async create(data){
    const { name, creator } = data;
    const res = await sysLabelModel.findOne({
      where: { name, creator },
      raw: true,
    })
    if(res){
      return Promise.reject('标签名称已存在')
    }
    return sysLabelModel.create(data)
  }

  async update(data) {
    const {id, name, creator } = data;
    const res = await sysLabelModel.findOne({
      where: {
        name,
        creator,
        id: {
          [Op.not]: id
        }
      },
      raw: true,
    })
    if (res){
      return Promise.reject('类型名称已存在')
    }
    return sysLabelModel.update(data, { where: { id: data.id } })
  }
  async delete(id){
    return sysLabelModel.destroy({ where: { id } })
  }
}
module.exports = new SysLabelService();
