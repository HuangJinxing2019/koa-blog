const { returnInfo, verifyToken } = require('../libs/utils')
const { NOT_LOGIN, LOGIN_INVALIDATION } = require('../config/error_config')

async function verifyCheckin(ctx, next){
  const token = ctx.cookies.get('token')
  if (typeof token === 'undefined' || !token) return ctx.body = returnInfo(NOT_LOGIN)
  try {
    const info = await verifyToken(token);
    ctx.request.userInfo = { code: 200, data: info };
    next()
  } catch (err) {
    ctx.body = returnInfo(LOGIN_INVALIDATION)
  }
}

module.exports = {
  verifyCheckin,
}
