import {
  login, userList, status
}
  from "@/api/user/index";

const userModule = {
  namespaced: true,
  state: {
    userDetail: {},
    userList: [],
    status: '',
  },

  actions: {
    async login({state, commit, dispatch}, payload) {

      const {data} = await login(payload);

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
