import Vue from 'vue'
export function checkLoginStatus(params) {
  return Vue.http.post('/login/miniSiteCheckLoginStatus',params)
 }
//查询是否授权绑定用户