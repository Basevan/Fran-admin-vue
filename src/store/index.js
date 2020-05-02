import Vue from 'vue'
import Vuex from 'vuex';
import menuModule from './system/menu';
import userModule from './system/user/index';
import roleModule from './system/role/index';

import employeeModule from './company/employee';

import processModule from './process/index';


Vue.use(Vuex)

  const getters={
    allData: state => state.allData,
  };

const store = new Vuex.Store({
  state: {
    userDetail: {},
    loading: false,
    navCollapse: document.body.clientWidth < 800 || false,
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
      if (payload) {
        state.navCollapse = payload;
      } else {
        state.navCollapse = !state.navCollapse;
      }
    },
    closeLoading(state, payload) {

    }
  },

  actions: {

  },

  getters: {
    getCount: state => {
      return state.count;
    }
  },
  modules: {
    menuModule,
    userModule,
    roleModule,

    employeeModule,

    processModule,
  }

});

export default store;
