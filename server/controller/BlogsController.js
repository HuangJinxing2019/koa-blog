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
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }

  async queryUserListPage(ctx){
    const { limit, offset, whereData } = ctx.request.body
    try{
      let { count, rows } = await sysBlogsService.userQueryList({limit, offset, whereData});
      ctx.body = returnInfo(SUCCESS, returnPageData(offset, limit, count, rows));
    }catch (err){
      console.log('获取博客列表异常', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
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
      const res = await sysBlogsService.create({ title, open, categoryId, creator: account })
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
  async queryById(ctx){
    const { id } = ctx.request.body;
    if(!id) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: 'id不能为空' });
    try {
      const data = await sysBlogsService.queryById(id);
      ctx.body = returnInfo(SUCCESS, data)
    } catch (err){
      console.log('查询文章详情异常', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async publishBlogs(ctx){
    const { id, labelIds, mainImgUrl, snippet } = ctx.request.body
    if(!id) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: 'id不能为空' });
    if(!labelIds || labelIds.length === 0) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '标签不能为空' });
    if(!snippet) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '文章摘要不能为空' });
    if(snippet.length > 100) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '文章摘要字符长度不能大于100' });
    try {
      await sysBlogsService.update({
        id,
        labelIds: labelIds.join(','),
        mainImgUrl,
        snippet,
        status: 1,
      })
      ctx.body = returnInfo(SUCCESS, true)
    } catch (err) {
      console.log('发布文章失败', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async updateContent(ctx){
    const { id, content } = ctx.request.body
    if(!id) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: 'id不能为空' });
    try {
      await sysBlogsService.updateContent({ id, content })
      ctx.body = returnInfo(SUCCESS, true)
    } catch (err){
      console.log('更新文章内容出错', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  // 更新状态
  async updateOpen(ctx){
    const { id, open } = ctx.request.body
    if(!id) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: 'id不能为空' });
    try {
      await sysBlogsService.update({ id, open })
      ctx.body = returnInfo(SUCCESS, true)
    } catch (err){
      console.log('更新状态错误', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async queryUserById(ctx){
    const { id } = ctx.request.body;
    if(!id) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: 'id不能为空' });
    try {
      const data = await sysBlogsService.queryUserById(id)
      ctx.body = returnInfo(SUCCESS, data)
    } catch (err){
      console.log('查询博客详情失败', err)
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }

  }
}

module.exports = new BlogsController();
