import Vue from 'vue'
export function getDesinerMes(params) {
  return Vue.http.get('/designer/listDesigners', {params:params})
 }
