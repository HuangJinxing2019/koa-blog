const { returnInfo, returnPageData } = require("../libs/utils");
const {PARAMS_ERROR, SUCCESS, UNKNOWN_ERROR} = require("../config/error_config");
const sysLabelService = require('../services/SysLabelService')

class LabelController{
  async queryLabelPage(ctx){
    const queryData = ctx.request.body;
    try {
      const { count, rows } = await sysLabelService.queryList(queryData)
      ctx.body = returnInfo(SUCCESS, returnPageData(queryData.offset, queryData.limit, count, rows))
    } catch (err){
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async queryLabelAll(ctx){
    try {
      const res = await sysLabelService.queryListAll()
      ctx.body = returnInfo(SUCCESS, res)
    } catch (err){
      ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async createLabel(ctx){
    const { name, remark } = ctx.request.body;
    const { account } = ctx.request.userInfo;
    if (!name) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '标签名称不能为空' })
    if (name.length > 12) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '标签名称长度字符数大于12' })
    if (remark && remark.length > 64) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '备注字符长度不能大于64' })
    try {
      const res = await sysLabelService.create({ name, remark, creator: account })
      ctx.body = returnInfo(SUCCESS, res.dataValues)
    }catch (err){
      console.log('创建标签异常', err)
      if (typeof err === 'string') ctx.body = returnInfo({...UNKNOWN_ERROR, msg: err})
      else ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async updateLabel(ctx){
    const { id, name, remark, creator } = ctx.request.body
    if(!id) return ctx.body = returnInfo({...PARAMS_ERROR, msg: '标签id不能为空'})
    if (!name) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '标签名称不能为空' })
    if (name.length > 12) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '标签名称长度字符数大于12' })
    if (remark && remark.length > 64) return ctx.body = returnInfo({ ...PARAMS_ERROR, msg: '备注字符长度不能大于64' })
    try {
      const res = sysLabelService.update({id, name, remark, creator})
      ctx.body = returnInfo(SUCCESS, res)
    } catch (err){
      if (typeof err === 'string') ctx.body = returnInfo({...UNKNOWN_ERROR, msg: err})
      else ctx.body = returnInfo(UNKNOWN_ERROR)
    }
  }
  async deleteLabel(ctx){
    const { id } = ctx.request.body
    if(!id) return returnInfo({...PARAMS_ERROR, msg: '标签id不能为空'})
    await sysLabelService.delete(id)
    returnInfo(SUCCESS, true)
  }
}
module.exports = new LabelController();
