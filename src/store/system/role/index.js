import {
  roleList, changeStatus
} from "@/api/system/role";

const roleModule = {
  namespaced: true,
  state: {
    list: [],
    status: 0
  },

  actions: {
    async getRoleList({state, commit, dispatch}, payload) {
      const {data} = await roleList(payload);

      if (data.code === 200) {
        state.list = data.data;
      }
    },

    async changeStatus({ state, commit, dispatch }, payload) {
      const { data } = await changeStatus(payload);

      if (data.code === 200) {
        state.status = data.data;
      }
    }
  }
};

export default roleModule;
