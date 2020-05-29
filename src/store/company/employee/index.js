import {
  employeeList, delEmployee,
} from "../../../api/company/employee";
import { Notification } from 'element-ui';

const employeeModule = {
  namespaced: true,
  state: {
    pageSize: 10,
    currentPage: 1,
    totalRecord: 0,
    totalPage: 0,
    employeeList: [],
  },

  actions: {

    async employeeList({ state, commit, dispatch }, payload) {
      commit('showLoading', null, { root: true});

      const params = {
        ...payload,
        pageSize: state.pageSize,
      };

      const { data } = await employeeList(params);

      if (data.code === 200) {
        state.employeeList = data.data.data;
        state.pageSize = data.data.paginator.pageSize;
        state.currentPage = data.data.paginator.currentPage;
        state.totalRecord = data.data.paginator.totalRecord;
      }
      commit('closeLoading', null, { root: true});

    },

    async delEmployee({ state, commit, dispatch }, payload) {

      const { data } = await delEmployee(payload);

      if (data.data) {
        Notification.success({
          title: '成功',
          message: '删除成功'
        });
      }
    }
  }
};

export default employeeModule;
