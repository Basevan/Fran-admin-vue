import {
  jobList, updateJob, delJob
} from "../../../api/company/index";
import { Notification } from 'element-ui';


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
      commit('showLoading', null, { root: true});

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

      commit('closeLoading', null, { root: true});

    },

    async updateJob({ state, commit, dispatch}, payload) {

      const { data } = await updateJob(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '修改成功'
        });
      }
    },

    async delJob({ state, commit, dispatch}, payload) {

      const { data } = await delJob(payload);

      if (data.code === 200) {
        Notification.success({
          title: '成功',
          message: '删除成功'
        });
      }
    },


  }
};

export default jobModule;
