const Sequelize = require('sequelize')
const SysBlogsModel = require('../db/models/sys_blogs')
const SysCategoryModel = require('../db/models/sys_category')
const sysCategoryService = require('./SysCategoryService');

SysBlogsModel.belongsTo(SysCategoryModel, { as: 'c', foreignKey: 'categoryId', targetKey: 'id' });
SysCategoryModel.hasOne(SysBlogsModel, { foreignKey: 'categoryId', sourceKey: 'id' });

class SysBlogsService{
  async queryList({ limit, offset, whereData }){
    return SysBlogsModel.findAndCountAll({
      attributes: [[Sequelize.col('c.name'), 'categoryName'], 'id', 'title', 'open', 'categoryId', 'status', 'createdAt', 'updatedAt', 'mainImgUrl'],
      where: whereData,
      include: [{
        model: SysCategoryModel,
        attributes: [],
        as: 'c',
      }],
      raw: true,
      limit,
      offset,
    })
  }
  async create(data){
    const res = await SysBlogsModel.create(data)
    const { categoryId, open } = res.dataValues
    // 类型计数
    await sysCategoryService.setCount({ id: categoryId, open, type: 'create' })
    return res
  }
  async update(data){
    return SysBlogsModel.update(data, where({ id: data.id }))
  }
  async delete(id){
    const { categoryId, open } = await SysBlogsModel.findOne({ where: { id }, raw: true });
    const res = await SysBlogsModel.destroy({ where: { id } })
    await sysCategoryService.setCount({ id: categoryId, open, type: 'delete' })
    return res
  }
}

module.exports = new SysBlogsService();
