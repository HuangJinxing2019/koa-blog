const { returnInfo, verifyToken } = require('../libs/utils')
const { NOT_LOGIN, LOGIN_INVALIDATION } = require('../config/error_config')

async function verifyCheckin(ctx, next){
  const token = ctx.cookies.get('token')
  if (typeof token === 'undefined' || !token) return ctx.body = returnInfo(NOT_LOGIN)
  try {
    const info = await verifyToken(token)
    ctx.request.userInfo = { account: info.account };
    await next()
  } catch (err) {
    console.log('登录失效', err)
    ctx.body = returnInfo(LOGIN_INVALIDATION)
  }
}

async function pageFormat(ctx, next){
  let pageSize = 10,
      pageNum = 1;
  if(ctx.request.body){
    pageSize = ctx.request.body.pageSize;
    pageNum = ctx.request.body.pageNum;
  }else {
    ctx.request.body = {}
  }
  Number.isNaN(Number(pageNum)) && (pageNum = 1)
  Number.isNaN(Number(pageSize)) && (pageSize = 10)
  ctx.request.body.limit = pageSize;
  ctx.request.body.offset = (pageNum - 1) * 10
  await next()
}

module.exports = {
  verifyCheckin,
  pageFormat
}
