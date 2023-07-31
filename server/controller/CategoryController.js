const sysCategoryService = require('../services/SysCategoryService')
const { returnInfo, returnPageData } = require('../libs/utils')
const { PARAMS_ERROR, UNKNOWN_ERROR, SUCCESS } = require('../config/error_config')
class CategoryController{
  async queryCategoryPage(ctx){
    try {
      let queryData = ctx.request.body;
      const { count, rows } = await sysCategoryService.queryList(queryData)
      ctx.body = returnInfo(SUCCESS, returnPageData(queryData.offset, queryData.limit, count, rows));
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
    if (remark && remark.length > 64) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '备注字符长度不能大于64' })
    try {
      const result = await sysCategoryService.create({name, imgUrl, remark, creator: account});
      ctx.body = returnInfo(SUCCESS, result.dataValues)
    } catch (err) {
      console.log('新建分类异常', err)
      if(typeof err === 'string') ctx.body = returnInfo({ ...UNKNOWN_ERROR, msg: err })
      else ctx.body = returnInfo(UNKNOWN_ERROR)
    }

  }
  async updateCategory(ctx){
    const { id, name, imgUrl, remark, creator } = ctx.request.body
    if (!name) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '类型名称不能为空'})
    if (name.length > 12) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '类型名称长度字符数大于12'})
    if (remark && remark.length > 64) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '备注字符长度不能大于64' })
    try {
      const result = await sysCategoryService.update({ id, name, imgUrl, remark, creator });
      ctx.body = returnInfo(SUCCESS, result.dataValues)
    } catch (err){
      console.log('更新分类异常', err)
      if( typeof err === 'string')  ctx.body = returnInfo({...UNKNOWN_ERROR, msg: err})
      else ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async deleteCategory(ctx){
    const { id } = ctx.request.body
    if(!id) return ctx.body = returnInfo({ PARAMS_ERROR, msg: '类型id不能为空' });
    try {
      await sysCategoryService.delete(id);
      ctx.body = returnInfo(SUCCESS, true)
    } catch (err) {
      console.log('删除分类异常', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
}
module.exports = new CategoryController();
