import Vue from 'vue'
export function miniSiteAppoints(params) {
  return Vue.http.post('/Designer/miniSiteAppoints', params)
 }
