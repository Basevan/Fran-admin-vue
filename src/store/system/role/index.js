import {
  roleList, changeStatus, save, delRoleUser,
  roleUserList, saveRoleUser, permissionList, rolePermissionList, updateRolePermissionList
} from "@/api/system/role";
import { Notification } from "element-ui";

const roleModule = {
  namespaced: true,
  state: {
    list: [],
    roleUserList: [],
    status: 0,
    permissionList: [],
    rolePermissionList: [],
  },

  actions: {
    async getRoleList({state, commit, dispatch}, payload) {
      commit('showLoading', null, { root: true});
      const {data} = await roleList(payload);

      if (data.code === 200) {
        state.list = data.data;
      }

      commit('closeLoading', null, { root: true});
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

    async delRoleUser({ state, commit, dispatch }, payload) {
      const { data } = await delRoleUser(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '删除成功'
        });
      }
    },

    async permissionList({ state, commit, dispatch }, payload) {
      const { data } = await permissionList(payload);

      if (data.code === 200) {
        state.permissionList = data.data;
      }
    },

    async rolePermissionList({ state, commit, dispatch }, payload) {
      const { data } = await rolePermissionList(payload);

      if (data.code === 200) {
        state.rolePermissionList = data.data;
      }
    },

    async updateRolePermissionList({ state, commit, dispatch }, payload) {
      const { data } = await updateRolePermissionList(payload);

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
