import {authLogin, authRegister} from "~/config/api";
import request from "~/utils/request";
import {getServerCookies} from "~/utils";

export const state = () => ({
  token: '',
  userInfo: null,
})

export const mutations = {
  setToken(state, token){
    state.token = token;
  },
  setUserInfo(state, userInfo){
    state.userInfo = userInfo
  },
  setLoginInfo(state, data){
    const { token, userInfo } = data
    state.token = token;
    state.userInfo = userInfo;
  }
}
export const actions  = {
  nuxtServerInit({ commit },{ req }){
    const cookies = req.headers.cookie ? getServerCookies(req.headers.cookie) : '';
    const token = cookies ? cookies.token : '';
    commit('setToken', token)
  },
  async login({ commit },params){
    try {
      const res = await request.jsonPost(authLogin, params);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      commit('setLoginInfo', {
        token: res.data.token,
        userInfo: res.data
      })
    } catch (err) {
      throw new Error('登录异常'+err)
    }

  },
  async register({ commit },params){
    try {
      const res = await request.jsonPost(authRegister, params);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      commit('setLoginInfo', {
        token: res.data.token,
        userInfo: res.data
      })
    }catch (err){
      throw new Error('注册异常'+err)
    }
  },
}
