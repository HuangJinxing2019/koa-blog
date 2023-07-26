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

function getRandomStr(len){
  const arr = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",

    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",

    "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",

    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",

    "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",

    "3", "4", "5", "6", "7", "8", "9", "-", "&", "@", "!",
    "$","_","+","="
  ];
  let str = '';
  for(let i = 0; i < len; i++){
    str += arr[Math.floor(Math.random() * arr.length)]
  }
  return str
}


module.exports = {
  returnInfo,
  genToken,
  verifyToken,
  getRandomStr
}
