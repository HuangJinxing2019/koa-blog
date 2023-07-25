export default function ({ store }){
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  store.commit('setUserInfo', userInfo)
}
