import {
  roleList, changeStatus, save,
  roleUserList, saveRoleUser
} from "@/api/system/role";
import { Notification } from "element-ui";

const roleModule = {
  namespaced: true,
  state: {
    list: [],
    roleUserList: [],
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
    },

    async saveRole({ state, commit, dispatch }, payload) {
      const { data } = await save(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '操作成功'
        });
      }
    },

    async getRoleUserList({state, commit, dispatch}, payload) {
      const {data} = await roleUserList(payload);

      if (data.code === 200) {
        state.roleUserList = data.data;
      }
    },


    async saveRoleUser({ state, commit, dispatch }, payload) {
      const { data } = await saveRoleUser(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '操作成功'
        });
      }
    },

  }
};

export default roleModule;
