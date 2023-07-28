const sysCategoryService = require('../services/SysCategoryService')
const { returnInfo } = require('../libs/utils')
const { PARAMS_ERROR, UNKNOWN_ERROR, SUCCESS } = require('../config/error_config')
class CategoryController{
  async queryCategoryPage(ctx){
    console.log('queryCategoryPagequeryCategoryPagequeryCategoryPage')
    try {
      let { name, offset, limit } = ctx.request.body;
      const result = await sysCategoryService.queryList({
        offset,
        limit,
      })
      console.log(result.dataValues)
      ctx.body = returnInfo(SUCCESS, {});
    } catch (err) {
      console.log('分页查询分类异常', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async createCategory(ctx){
    const { name, imgUrl, remark } = ctx.request.body,
          { account } = ctx.request.userInfo;
    if (!name) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '类型名称不能为空'})
    if (name.length > 12) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '类型名称长度字符数大于12'})
    try {
      const result = await sysCategoryService.create({name, imgUrl, remark, creator: account});
      ctx.body = returnInfo(SUCCESS, result.dataValues)
    } catch (err) {
      console.log('新建分类异常', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }

  }
  async updateCategory(ctx){
    const { name, imgUrl, remark } = ctx.request.body
    if (!name) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '类型名称不能为空'})
    if (name.length > 12) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '类型名称长度字符数大于12'})
    try {
      const result = await sysCategoryService.update({name, imgUrl, remark});
      ctx.body = returnInfo(SUCCESS, result.dataValues)
    } catch (err){
      console.log('更新分类异常', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  removeCategory(ctx){

  }
}
module.exports = new CategoryController();
