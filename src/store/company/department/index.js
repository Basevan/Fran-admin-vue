import {
  departmentList,departments,updateDepartment,deleteDepartment
} from "../../../api/company/index";
import { Notification } from 'element-ui';

const departmentModule = {
  namespaced: true,
  state: {
    pageSize: 10,
    currentPage: 1,
    totalRecord: 0,
    totalPage: 0,
    departmentList: [],
    departments: [],
  },

  actions: {

    async departmentList({ state, commit, dispatch }, payload) {
      commit('showLoading', null, { root: true});

      const { data } = await departmentList(payload);

      if (data.code === 200) {
        state.departmentList = data.data.departments;
      }
      commit('closeLoading', null, { root: true});
    },

    async departments({ state, commit, dispatch }, payload) {

      const { data } = await departments(payload);

      if (data.code === 200) {
        state.departments = data.data;
      }

    },

    async update({ state, commit, dispatch }, payload) {

      const { data } = await updateDepartment(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '操作成功'
        });
      }

    },

    async delete({ state, commit, dispatch }, payload) {

      const { data } = await deleteDepartment(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '删除成功'
        });
      }

    },

  }
};

export default departmentModule;
