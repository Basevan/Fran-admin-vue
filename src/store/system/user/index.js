import {
  login, userList, status, userDetail
}
  from "@/api/system/user/index";

const userModule = {
  namespaced: true,
  state: {
    userDetail: {},
    userList: [],
    username: '',
    status: '',
  },

  mutations: {

    getUserName(state) {
      let cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        let userName = cookie.toString();
        if ('userName' === userName.substring(1,9)) {
          state.username = cookie.substring(cookie.indexOf('=') + 1,cookie.length);
        }
      })
    }

  },

  actions: {
    async login({state, commit, dispatch}, payload) {

      const {data} = await login(payload);

      if (data.code === 200) {
        state.userDetail = data.data;
      }
    },

    // 无用
    async userDetail({state, commit, dispatch}, payload) {

      const params = {
        id: payload,
      };

      const {data} = await userDetail(params);

      if (data.code === 200) {
       state.userDetail = data.data;
      }
    },

    async getUserList({state, commit, dispatch}, payload) {

      const {data} = await userList(payload);

      if (data.code === 200) {
        state.userList = data.data;
      }
    },

    async changeStatus({state, commit, dispatch}, payload) {

      const {data} = await status(payload);

      if (data.code === 200) {
        state.status = data.data;
      }
    },

  }
};

export default userModule;
