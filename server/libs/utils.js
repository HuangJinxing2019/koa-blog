const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, EXPIRES_IN } = require('../config/encryption_config')

function returnInfo(statusInfo, data = null){
  return {
    ...statusInfo,
    data: data
  }
}

async function genToken(data) {
  return await jwt.sign(data, PRIVATE_KEY, { expiresIn: EXPIRES_IN })
}

async function verifyToken(token) {
  return await jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
  returnInfo,
  genToken,
  verifyToken
}
