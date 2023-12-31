import { Message } from "view-design";

export function getServerDomain(req){
  // 获取请求的协议
  if(process.server){
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http://';
    return protocol + req.headers.host
  }else {
    return ''
  }
}
export function getServerCookies(str){
  const keyValue = str.split('; ')
  return keyValue.reduce((pre, item) => {
    const [ key, value] = item.split('=')
    pre[key] = value
    return pre
  }, {})
}
export function copyText(text, msg = '复制成功'){
  return navigator.clipboard.writeText(text).then(
    function (){
      Message.success(msg)
    },
    function (err){
      Message.error(err)
  })
}
