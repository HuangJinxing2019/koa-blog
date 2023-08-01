const sysBlogsService = require('../services/SysBlogsService')
const { PARAMS_ERROR, UNKNOWN_ERROR, SUCCESS } = require('../config/error_config')
const { returnInfo, returnPageData  } = require('../libs/utils')

class BlogsController{
  async queryListPage(ctx){
    const { limit, offset, whereData } = ctx.request.body
    try{
      const { count, rows } = await sysBlogsService.queryList({limit, offset, whereData});
      ctx.body = returnInfo(SUCCESS, returnPageData(offset, limit, count, rows));
    }catch (err){
      console.log('获取博客列表异常', err)
      returnInfo(UNKNOWN_ERROR)
    }
  }
  async createBlogs(ctx){
    const { title, open, categoryId } = ctx.request.body;
    const { account } = ctx.request.userInfo;
    if (!title) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '文章标题不能为空'});
    if (title.length > 32) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '文章标题字符长度不能大于32'});
    if (!categoryId) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '文章分类不能为空'});
    if (typeof open !== 'boolean') return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '是否公开参数错误'});
    try {
      const res = sysBlogsService.create({ title, open, categoryId, creator: account })
      ctx.body = returnInfo(SUCCESS, res.dataValues)
    }catch (err){
      console.log('创建文章错误', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async deleteBlogs(ctx){
    const { id } = ctx.request.body
    if(!id) return ctx.body = returnInfo({...PARAMS_ERROR, msg: 'id不能为空'})
    try {
      await sysBlogsService.delete(id)
      ctx.body = returnInfo(SUCCESS, true)
    }catch (err){
      console.log('删除文章失败', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
}

module.exports = new BlogsController();
