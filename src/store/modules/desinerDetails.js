import { getDesinerDetails } from '@/api/desinerDetails';
const desinerDetails = {
  state: {
    dataList: {},
  },

  mutations: {
    SELECT_USR_INFO: (state, data) => {
      state.dataList = data;
    },

  },

  actions: {
    // 获取
    GetDesinerDetails({ commit },params) {
      return new Promise((resolve, reject) => {
      getDesinerDetails(params)
      .then(response=>{
        commit("SELECT_USR_INFO",response.data.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    });
    },

  }
};

export default desinerDetails;
