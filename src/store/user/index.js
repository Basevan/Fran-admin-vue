import { login } from "@/api/index";

const userModule = {
  namespaced: true,
  state: {
    userDetail: {}
  },

  actions: {
    async login({ state, commit, dispatch },payload) {

      const { data } = await login(payload);


      console.log(data);
      if (data.code === 200) {
        state.userDetail = data.data;


      }
    }
  }
};

export default userModule;
