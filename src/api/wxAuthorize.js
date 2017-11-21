import Vue from 'vue'
export function getAuthorize() {
  return Vue.http.get('/minisite/login')
 }
