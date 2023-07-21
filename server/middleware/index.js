const { returnInfo, verifyToken } = require('../libs/utils')
const { NOT_LOGIN, LOGIN_INVALIDATION } = require('../config/error_config')

async function verifyCheckin(ctx, next){
  const authorization = ctx.header.authorization
  if (!authorization) return ctx.body = returnInfo(NOT_LOGIN)
  const token = authorization.split(' ' )[1];
  try {
    const info = await verifyToken(token);
    ctx.request.userInfo = { account } = info;
    next()
  } catch (err) {
    ctx.body = returnInfo(LOGIN_INVALIDATION)
  }
}

module.exports = {
  verifyCheckin,
}
