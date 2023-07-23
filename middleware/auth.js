import { checkToken } from "~/config/api";
import request from "~/utils/request";

export default async function ({ $axios, redirect, req, store, route }, next){

  let token = ''
  if (process.server){
    const cookies = req.headers.cookie !== 'undefined' && req.headers.cookie ? getServerCookies(req.headers.cookie) : '';
    token = cookies ? cookies.token : '';
    store.commit('initData', token || '')
  } else {
    token = store.state.token
  }

  if(!token){
    redirect('/login')
  } else {
    const { data } = await request.jsonPost(checkToken,{ token })
    if(route.path !== '/login' && !data.data){
      redirect('/login')
    }
  }
  next()
}

function getServerCookies(str){
  const keyValue = str.split('; ')
  return keyValue.reduce((pre, item) => {
    const [ key, value] = item.split('=')
    pre[key] = value
    return pre
  }, {})
}

