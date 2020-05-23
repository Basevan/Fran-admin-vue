import Vue from 'vue'
import Vuex from 'vuex';
import menuModule from './system/menu';
import userModule from './system/user/index';
import roleModule from './system/role/index';

import employeeModule from './company/employee';
import departmentModule from './company/department';
import jobModule from './company/job';
import titleModule from './company/title';

import processModule from './process/index';

import { router } from '@/router';


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
    },
    // 过滤没有权限以及不显示的路由
    routes: () => {
      return filterRouter(router);
    }
  },
  modules: {
    menuModule,
    userModule,
    roleModule,

    employeeModule,
    departmentModule,
    jobModule,
    titleModule,

    processModule,
  }

});

/**
 * 过滤路由，供导航栏使用，没有权限不显示
 * @param routers {Object} 路由对象
 */
const filterRouter = (routers) => {

  let permissionList = localStorage.getItem('permission').split(',');
  console.log(...permissionList);

  const newRouter = routers.filter((route) => !route.hidden || route.hidden === undefined);

  // 过滤子路由
  newRouter.forEach(route => {
    let routes = route.children.filter(elem => hasPermission(elem.path,permissionList));
    route.children = routes;
    if (routes.length === 0) {
      route.hidden = true;
    }
  });
  return newRouter;
};

export const hasPermission = (path,permissionList) => {
  let flag = false;
  permissionList.forEach(permission => {
    if (path === permission) {
      flag = true;
    }
  });
  return flag;
};

export default store;
