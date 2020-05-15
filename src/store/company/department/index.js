import {
  departmentList
} from "../../../api/company/index";

const departmentModule = {
  namespaced: true,
  state: {
    pageSize: 10,
    currentPage: 1,
    totalRecord: 0,
    totalPage: 0,
    departmentList: [],
  },

  actions: {

    async departmentList({ state, commit, dispatch }, payload) {

      const { data } = await departmentList(payload);

      if (data.code === 200) {
        state.departmentList = data.data.departments;
      }

    }
  }
};

export default departmentModule;
