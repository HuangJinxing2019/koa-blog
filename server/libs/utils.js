function returnInfo(statusInfo, data = null){
  return {
    ...statusInfo,
    data: data
  }
}

module.exports = {
  returnInfo
}
