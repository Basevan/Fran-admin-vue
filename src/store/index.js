import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

  const getters={
    allData: state => state.allData,
  };

const store = new Vuex.Store({
  state: {
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
    }
  },

  getters,

});

export default store;
