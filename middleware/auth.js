import { checkToken } from "~/config/api";
import request from "~/utils/request";
import { getServerCookies } from "~/utils";

export default async function ({ redirect, req, store, route }){
  if (route.path === '/login') return;
  let token = ''
  if(process.server){
    const cookies = req.headers.cookie ? getServerCookies(req.headers.cookie) : '';
    token = cookies ? cookies.token : '';
  } else {
    token = store.state.token
  }
  if(!token && !route.path.startsWith('/user')){
    redirect('/login')
  } else if(!route.path.startsWith('/user')){

    try {
      const { data } = await request.jsonPost(checkToken,{ token })
      if(route.path !== '/login' && !data.data){
        redirect('/login')
      }
    }catch (err){}
  }
}

