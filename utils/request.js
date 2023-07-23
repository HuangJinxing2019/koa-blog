import axios from 'axios'
import {Message} from 'view-design'
import qs from 'qs'

let pending = [];
const CancelToken = axios.CancelToken;

Message.config({
  duration: 3
})
let removePending = (config) => {
  for(let i in pending){
    if(pending[i].url === config.url) { //在当前请求在数组中存在时执行取消函数
      pending[i].f(); //执行取消操作
    }
  }
}
let requestMap = {}

export const httpService = axios.create({
  //超时时间
  timeout: 30000,
  baseURL: 'http://localhost:3000'
});

httpService.interceptors.request.use(
  async (config) => {
    removePending(config);
    config.cancelToken = new CancelToken(function executor(c) {//本次axios请求的配置添加cancelToken
      pending.push({
        url: config.url,
        f: c
      });
    })
    return config;
  },
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

httpService.interceptors.response.use(
  response => {
    if(response.data.code !== 200){
      Message.error(response.data.msg)
    }
    // 返回响应
    return response;
  },
  error => {
    console.log(error)
    Message.error(error.message)
    return Promise.reject(error)
  }
)


export default {
  get(url) {
    return new Promise((resolve, reject) => {
      httpService({
        url,
        method: 'GET',
      }).then(res => {
        if(res.data.code === 200){
          resolve(res.data)
        }else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  jsonPost(url, params={}) {
    params = JSON.parse(JSON.stringify(params))
    return new Promise((resolve, reject) => {
      httpService({
        url,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: params,
      }).then(res => {
        if(res.data.code === 200){
          resolve(res.data)
        }else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  uploadFile(url, name, file) {
    return new Promise((resolve, reject) => {
      let params = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      params.append(name, file, file.name);
      httpService.post(url, params, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        });
    })
  },

  //文件下载
  downloadFile(url,config = {}){
    return httpService({
      url,
      responseType: 'blob',
      method: 'GET',
      timeout: 0,
      ...config
    })
  },
}


