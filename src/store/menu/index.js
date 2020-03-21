

const menuModule = {
  namespaced: true,
  state: {
    apple: 5,
  },
  mutations: {
    SET_ORDINARY(state,payload) {
      state.showList = payload;
    }
  },
  actions: {

  },
  getters: {
      getApp: state => {
        return state.apple;
      }
  }
};

export default menuModule;
