import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const Index = () => import(/* webpackChunkName: "mint-index" */ '@/views/index')
const guide = () => import(/* webpackChunkName: "mint-guide" */ '@/views/guide')
const desinerList = () => import(/* webpackChunkName: "mint-desiner" */ '@/views/desinerList')
const desinerDetails = () => import(/* webpackChunkName: "mint-desiner" */ '@/views/desinerDetails')
const caseList = () => import(/* webpackChunkName: "mint-case" */ '@/views/caseList')
const desinerCaseDetails = () => import(/* webpackChunkName: "mint-desiner" */ '@/views/desinerCaseDetails')
const login = () => import(/* webpackChunkName: "mint-login */ '@/views/login')
const caseDetails = () => import(/* webpackChunkName: "mint-case */ '@/views/caseDetails')
const aboutUs = () => import(/* webpackChunkName: "mint-case */ '@/views/aboutUs')
const chat = () => import(/* webpackChunkName: "mint-chat */ '@/views/chat')
// const test = () => import(/* webpackChunkName: "mint-case */ '@/views/demo')
const scroll = () => import(/* webpackChunkName: "mint-case */ '@/views/scroll')
const start = () => import(/* webpackChunkName: "mint-case */ '@/views/start')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start,
      meta: {title: '设计IN-设计师严选平台'}
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {title: '设计IN-设计师严选平台'}
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide,
      meta: {title: '设计IN-设计师严选平台'}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {title: '登录页'}
    },
    {
      path: '/desinerList',
      name: 'desinerList',
      component: desinerList,
      meta: {title: '找设计师 | 设计IN-设计师严选平台'}
    },
    {
      path: '/desinerDetails/:desiner_id',
      name: 'desinerDetails',
      component: desinerDetails,
      meta: {title: '设计师详情'}
    },
    {
      path: '/desinerCaseDetails/:desiner_id',
      name: 'desinerCaseDetails',
      component: desinerCaseDetails,
      meta: {title: '设计师案例详情'}
    },
    {
      path: '/caseList',
      name: 'caseList',
      component: caseList,
      meta: {title: '看设计案例 | 设计IN-设计师严选平台'}
    },
    {
      path: '/caseDetails/:case_id',
      name: 'caseDetails',
      component: caseDetails,
      meta: {title: '案例详情'}
      
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs,
      meta: {title: '关于 | 设计IN-设计师严选平台'}
      
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
      meta: {title: '在线客服'}
      
    },
    {
      path: '/start',
      name: 'start',
      component: start,
      meta: {title: '设计IN-设计师严选平台'}
      
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: test,
    //   meta: {title: '测试页面'} 
    // },
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll,
      meta: {title: '测试导航'}     
    },
    
  ]
})
