import Vue from 'vue'
import Vuex from 'vuex';
import menuModule from './system/menu';
import userModule from './system/user/index';
import roleModule from './system/role/index';

import employeeModule from './company/employee';
import departmentModule from './company/department';
import jobModule from './company/job';

import processModule from './process/index';



Vue.use(Vuex)

  const getters={
    allData: state => state.allData,
  };

const store = new Vuex.Store({
  state: {
    userDetail: {},
    loading: false,
    navCollapse: document.body.clientWidth < 1080 || false,
    count: 0,
    domain: '',
    allData: []
  },
  mutations: {

    changeDomain(state,newDomain){
      state.domain = newDomain;
    },
    changeCount(state,n){
      state.count += n;
    },
    addData(state,data) {
      state.allData = data;
    },
    setAllData(state,val){
      state.allData = val;
    },
    // 菜单隐藏显示
    setCollapse(state, payload) {
      console.log(payload);
      state.loading = true;
        state.navCollapse = payload ? payload : !state.navCollapse;
    },
    closeLoading(state, payload) {

    }
  },

  actions: {

  },

  getters: {
    getCount: state => {
      return state.count;
    },
    loading: state => {
      return state.loading;
    }
  },
  modules: {
    menuModule,
    userModule,
    roleModule,

    employeeModule,
    departmentModule,
    jobModule,

    processModule,
  }

});

export default store;
