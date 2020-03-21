import Vue from 'vue'
import Vuex from 'vuex';
import menuModule from './menu/index'

Vue.use(Vuex)

  const getters={
    allData: state => state.allData,
  };

const store = new Vuex.Store({
  state: {
    loading: false,
    navCollapse: document.body.clientWidth < 1450 || false,
    count: 0,
    domain: '',
    allData: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
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
  },

  getters: {
    getCount: state => {
      return state.count;
    }
  },
  modules: {
    menuModule,
  }

});

export default store;
