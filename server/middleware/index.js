const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../config/encryption_config')
const { returnInfo } = require('../libs/utils')

const { NOT_LOGIN, LOGIN_INVALIDATION } = require('../config/error_config')

function index(ctx, next){
  const authorization = ctx.header.authorization
  if (!authorization) return ctx.body = returnInfo(NOT_LOGIN)
  const token = authorization.split(' ' )[1];
  try {
    const info = jwt.verify(token, PRIVATE_KEY)
    ctx.request.userInfo = { account } = info;
    next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  verifyCheckin: index
}
