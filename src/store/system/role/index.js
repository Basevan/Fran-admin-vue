import {
  roleList,
} from "../../../api/system/role";

const roleModule = {
  namespaced: true,
  state: {
    list: [],
  },

  actions: {
    async getRoleList({state, commit, dispatch}, payload) {
      const {data} = await roleList(payload);

      if (data.code === 200) {
        state.list = data.data;
      }
    }
  }
};

export default roleModule;
