import {
  login, userList, status, userDetail
}
  from "@/api/system/user/index";

const userModule = {
  namespaced: true,
  state: {
    userDetail: {},
    permissionList: [],
    userList: [],
    allUser: [],
    username: '',
    status: '',
  },

  mutations: {

    getUserName(state) {
      let cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        let userName = cookie.toString();
        if (userName.includes('userName')) {
          let username = cookie.substring(cookie.indexOf('=') + 1,cookie.length);
          state.username = username;
        }
      })
    },

    setUserList(state) {
      state.userList = [];
    }

  },

  actions: {

    getUserName({state, commit, dispatch}, payload) {
      let cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        let userName = cookie.toString();
        if (userName.includes('userName')) {
          let username = cookie.substring(cookie.indexOf('=') + 1,cookie.length);
          state.username = username;
          dispatch('login',{userName: username});
        }
      })
    },

    async login({state, commit, dispatch}, payload) {

      const {data} = await login(payload);

      if (data.code === 200) {
        state.userDetail = data.data;
        state.permissionList = data.data.permissions;
        localStorage.setItem('permission',state.permissionList);
        return true;
      } else {
        return false;
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
      commit('showLoading', null, { root: true});

      const {data} = await userList(payload);

      if (data.code === 200) {
        state.userList = data.data;
      }

      commit('closeLoading', null, { root: true});
    },

    async getAllUser({state, commit, dispatch}, payload) {

      const {data} = await userList(payload);

      if (data.code === 200) {
        state.allUser = data.data;
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
