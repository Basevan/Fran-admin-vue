import {
  jobList
} from "../../../api/company/index";

const jobModule = {
  namespaced: true,
  state: {
    pageSize: 10,
    currentPage: 1,
    totalRecord: 0,
    totalPage: 0,
    jobList: [],
  },

  actions: {

    async jobList({ state, commit, dispatch }, payload) {

      const params = {
        ...payload,
        pageSize: state.pageSize,
        currentPage: payload.currentPage || 1,
      };

      const { data } = await jobList(params);

      if (data.code === 200) {
        state.jobList = data.data.data;
        state.pageSize = data.data.paginator.pageSize;
        state.currentPage = data.data.paginator.currentPage;
        state.totalRecord = data.data.paginator.totalRecord;
      }

    }
  }
};

export default jobModule;
