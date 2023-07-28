import { Message } from "view-design";
export default function ({$axios, redirect}) {
  // console.log($axios.CancelToken)
  // const CancelToken = $axios.CancelToken,
  //   pending = [];

  // let removePending = (config) => {
  //   for (let i in pending) {
  //     if (pending[i].url === config.url) { //在当前请求在数组中存在时执行取消函数
  //       pending[i].f(); //执行取消操作
  //     }
  //   }
  // }
  //
  // $axios.interceptors.request.use(config => {
  //   removePending(config);
  //   config.cancelToken = new CancelToken(function executor(c) {//本次axios请求的配置添加cancelToken
  //     pending.push({
  //       url: config.url,
  //       f: c
  //     });
  //   })
  // })

  // 添加响应拦截器
  $axios.interceptors.response.use(
    response => {
    // 检查响应的状态码，假设 40001 表示令牌失效
    if (response.data.code === 40001) {
      Message.error(response.data.msg)
      // 重定向到登录页
      redirect('/login');
      return Promise.reject(response.data)
    } else if(response.data.code !== 200){
      Message.error(response.data.msg)
      return Promise.reject(response.data)
    }
    // 返回响应
    return response.data;
  },
  error => {
    return Promise.reject(error);
  });
}
