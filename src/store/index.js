import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import leftBar from './modules/leftBar'; //状态栏
import desinerDetails from './modules/desinerDetails'; //slde 分屏切换做缓存
import userInfo from './modules/login'; //user
import appointment from './modules/appointment'; //预约的设计师
import wxAuthorize from './modules/wxAuthorize'; //预约的设计师
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    leftBar,
    desinerDetails,
    userInfo,
    appointment,
    wxAuthorize

  },
  getters
});

export default store
