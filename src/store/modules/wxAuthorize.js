import { getAuthorize } from '@/api/wxAuthorize';
const Authorize = {
  state: {
    data: {},
  },

  mutations: {
    SELECT_AUTHOR: (state, data) => {
      state.authorizeId = data;
    },

  },

  actions: {
    // 获取
    GetAuthorize({ commit },params) {
      return new Promise((resolve, reject) => {
        getAuthorize(params)
      .then(response=>{
        
        commit("SELECT_AUTHOR",response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    });
    },

  }
};

export default Authorize;
