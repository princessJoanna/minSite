import Vue from 'vue'
export function getCaseMes(params) {
  return Vue.http.get('/minisite/getDesignerCase', {params:params})
 }

//  http://192.168.137.1:8420

