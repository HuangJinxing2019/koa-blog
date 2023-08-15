const Sequelize = require('sequelize')
const { Op, literal } = require('sequelize')
const SysBlogsModel = require('../db/models/sys_blogs')
const SysCategoryModel = require('../db/models/sys_category')
const SysUserModel = require('../db/models/sys_user')
const SysLabelModel = require('../db/models/sys_label')
const sysCategoryService = require('./SysCategoryService')

SysBlogsModel.belongsTo(SysCategoryModel, {
  as: 'c',
  foreignKey: 'categoryId',
  targetKey: 'id',
})
SysCategoryModel.hasOne(SysBlogsModel, {
  foreignKey: 'categoryId',
  sourceKey: 'id',
})

SysBlogsModel.belongsTo(SysUserModel, {
  as: 'userInfo',
  foreignKey: 'creator',
  targetKey: 'account',
})

SysUserModel.hasOne(SysBlogsModel, {
  foreignKey: 'creator',
  sourceKey: 'account',
})

// SysBlogsModel.addHook('afterFind', async (instances) => {
//   if (!Array.isArray(instances)) {
//     instances = [instances];
//   }
//   for (const instance of instances) {
//     const lIdArray = instance.labelIds.split(',').map(Number);
//     instance.Bs = await SysLabelModel.findAll({
//       where: {
//         [Op.or]: lIdArray.map((id) => ({id})),
//       },
//       raw: true
//     });
//   }
// })


class SysBlogsService {
  async queryList({ limit, offset, whereData }) {
    return SysBlogsModel.findAndCountAll({
      attributes: [
        [Sequelize.col('c.name'), 'categoryName'],
        'id',
        'title',
        'open',
        'categoryId',
        'status',
        'updatedAt',
        'mainImgUrl',
        'snippet',
      ],
      where: whereData,
      include: [
        {
          model: SysCategoryModel,
          attributes: [],
          as: 'c',
        },
      ],
      raw: true,
      limit,
      offset,
    })
  }

  async userQueryList({ limit, offset, whereData }){
    return SysBlogsModel.findAndCountAll({
      attributes: [
        [Sequelize.col('c.name'), 'categoryName'],
        'id',
        'title',
        'open',
        'categoryId',
        'status',
        'updatedAt',
        'mainImgUrl',
        'snippet',
      ],
      where: whereData,
      include: [
        {
          model: SysCategoryModel,
          attributes: [],
          as: 'c',
        },
        {
          model: SysUserModel,
          as: 'userInfo',
          raw: true,
        },
      ],
      limit,
      offset,
    })
  }

  async create(data) {
    const res = await SysBlogsModel.create(data)
    const { categoryId, open, status } = res.dataValues
    // 类型计数
    await sysCategoryService.setCount({ id: categoryId, open, status, type: 'create' })
    return res
  }

  async update(data) {
    const { categoryId, open, status } = await SysBlogsModel.findOne({
      where: { id: data.id },
      raw: true,
    })
    const res = await SysBlogsModel.update(data, { where: { id: data.id } });
    if(data.open !== undefined && data.open !== open ||
      data.status !== undefined && data.status !== status){
      await sysCategoryService.setCount({ id: categoryId, open, status, type: 'update' })
    }

    return res
  }

  async delete(id) {
    const { categoryId, open, status } = await SysBlogsModel.findOne({
      where: { id },
      raw: true,
    })
    const res = await SysBlogsModel.destroy({ where: { id } })
    await sysCategoryService.setCount({ id: categoryId, open, status, type: 'delete' })
    return res
  }

  async queryById(id) {
    return SysBlogsModel.findOne({ where: { id }, raw: true })
  }

  async updateContent({ id, content }) {
    return SysBlogsModel.update({ content }, { where: { id } })
  }
}

module.exports = new SysBlogsService()
