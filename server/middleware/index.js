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
  const body = ctx.request.body;
  const { account } = ctx.request.userInfo;
  let queryData = {
    limit: 10,
    offset: 0,
    whereData: { creator: account }
  };
  if(body){
    const { pageNum, pageSize } = body;
    console.log(body)
    !Number.isNaN(Number(pageNum)) && (queryData.offset = pageNum - 1)
    !Number.isNaN(Number(pageSize)) && (queryData.limit = pageSize)
    for (let key in body){
     if(key !== 'pageSize' && key !== 'pageNum'){
       if(typeof body[key] === 'string' && body[key].trim() !== '') queryData.whereData[key] = body[key]
       else if(typeof body[key] !== 'string') queryData.whereData[key] = body[key]
     }
    }
  }
  ctx.request.body = {...body, ...queryData}
  await next()
}

module.exports = {
  verifyCheckin,
  pageFormat
}
