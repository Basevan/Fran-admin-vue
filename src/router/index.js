import Vue from 'vue'
import Router from 'vue-router';
import MyMessage from "../views/myMessage/MyMessage";
import MyProcess from "../views/myProcess/MyProcess";
import layout from "../views/layout/Layout.vue";


Vue.use(Router)

const router = [
  {
    path: '',
    hidden: true,
    component: layout,
    redirect: '/home',
    meta: {
      title: '首页',
      index: '1',
    },
    children: [
      {
        path: '/home',
        meta: {
          title: '首页显示',
          index: '2',
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
      },
    ]
  },
  {
    path: '/edit',
    component: layout,
    meta: {
      title: '编辑',
      index: '3',
    },
    children: [
      {
        path: '/edit/add',
        name: 'add',
        component: () => import('../views/editMenu/Create'),
        meta: {
          title: '增加',
          index: '4',
        },
      },
      {
        path: '/edit/tree',
        name: 'editTree',
        component: () => import('../views/editMenu/EditTree'),
        meta: {
          title: '树形',
          index: '5',
        },
        children: [
          {
            path: '/edit/edit',
            name: 'edit2',
            component: () => import('../views/editMenu/Edit'),
            meta: {
              title: '编辑2',
              index: '6',
            },
          }
        ]
      },
      {
        path: '/edit/editMenu',
        name: 'editMenu',
        component: () => import('../views/editMenu/EditMenu'),
        meta: {
          title: '编辑导航栏',
          index: '7',
        },
      },
      {
        path: '/edit/newAdd',
        name: 'addNewImpl',
        component: () => import('../views/editMenu/CreateNewImpl'),
        meta: {
          title: '新增2',
          index: '8',
        },
      },
      {
        path: '/testForm',
        name: 'test',
        component: () => import('../views/form/testForm'),
        meta: {
          title: '测试',
          index: '9',
        },
      }
    ]
  },
  {
    path: '/myMessage',
    name: 'myMessage',
    component: layout,
    meta: {
      title: '消息',
      index: '10',
    },
    children: [
      {
        path: '/myMessage/my',
        component: MyMessage,
        meta: {
          title: '我的消息',
          index: '11',
        },
      }
    ]
  },
  {
    path: '/myProcess',
    name: 'myProcess',
    component: layout,
    meta: {
      title: '流程',
      index: '12',
    },
    children: [
      {
        path: '/myProcess/my',
        component: MyProcess,
        meta: {
          title: '流程',
          index: '13',
        },
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   redirect: '/login',
  //   component: Vue,
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/editMenu',
    name: 'editMenu',
    component: () => import('../views/form/Second')
  },
];

export default new Router({
  routes: router,
  mode: 'history'
})
