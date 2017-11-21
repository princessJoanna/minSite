import Vue from 'vue'
export function getCaseDetails(params) {
  return Vue.http.get('/minisite/getDesignerCaseDetail', {params:params})
 }