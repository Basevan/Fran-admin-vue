import {
  employeeList
} from "../../../api/company/employee";

const employeeModule = {
  namespaced: true,
  state: {
    employeeList: [],
  },

  actions: {

    async employeeList({ state, commit, dispatch }, payload) {

      const { data } = await employeeList();

      if (data.code === 200) {
        state.employeeList = data.data;
      }

    }
  }
};

export default employeeModule;
