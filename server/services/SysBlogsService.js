const SysBlogsModel = require('../db/models/sys_blogs')
const SysCategoryModel = require('../db/models/sys_category')
const sysCategoryService = require('./SysCategoryService');
const { where } = require("sequelize");

class SysBlogsService{

  async queryList({ limit, offset, whereData }){
    return SysBlogsModel.findAndCountAll({
      where: whereData,
      include: [
        {
          model: SysCategoryModel,
          on: { id: SysCategoryModel.col('sysBlogsModel.categoryId') },
          attributes: [['name', 'categoryName']],
        }
      ],
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
