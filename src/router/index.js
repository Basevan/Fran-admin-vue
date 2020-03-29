import Vue from 'vue'
import Router from 'vue-router';
import MyMessage from "../views/myMessage/MyMessage";
import MyProcess from "../views/myProcess/MyProcess";
import layout from "../views/layout/Layout.vue";


Vue.use(Router)

const router = [
  {
    path: '',
    hidden: false,
    component: layout,
    redirect: '/home',
    meta: {
      title: '主页',
      icon: 'el-icon-s-home',
      index: '1',
    },
    children: [
      {
        path: '/home',
        meta: {
          title: '了解Fran',
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
      title: '公司管理',
      icon: 'el-icon-office-building',
      index: '3',
    },
    children: [
      {
        path: '/edit/add',
        name: 'add',
        component: () => import('../views/editMenu/Create'),
        meta: {
          title: '用户管理',
          index: '4',
        },
      },
      {
        path: '/edit/tree',
        name: 'editTree',
        component: () => import('../views/editMenu/EditTree'),
        meta: {
          title: '角色管理',
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
        path: '/edit/newAdd',
        name: 'addNewImpl',
        component: () => import('../views/editMenu/CreateNewImpl'),
        meta: {
          title: '部门管理',
          index: '7',
        },
      },
      {
        path: '/edit/newAdd',
        name: 'addNewImpl',
        component: () => import('../views/editMenu/CreateNewImpl'),
        meta: {
          title: '岗位管理',
          index: '8',
        },
      },
    ]
  },
  {
    path: '/menuManage',
    components: layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting',
      index: '9'
    },
    children: [
      {
        path: '/edit/editMenu',
        name: 'editMenu',
        component: () => import('../views/editMenu/EditMenu'),
        meta: {
          title: '菜单管理',
          index: '10',
        },
      },
      {
        path: '/testForm',
        name: 'test',
        component: () => import('../views/form/testForm'),
        meta: {
          title: '字典管理',
          index: '11',
        },
      },
      {
        path: '/testForm',
        name: 'test',
        component: () => import('../views/form/testForm'),
        meta: {
          title: '参数设置',
          index: '12',
        },
      },
      {
        path: '/testForm',
        name: 'test',
        component: () => import('../views/form/testForm'),
        meta: {
          title: '日志管理',
          index: '13',
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
      icon: 'el-icon-chat-line-round',
      index: '14',
    },
    children: [
      {
        path: '/myMessage/my',
        component: MyMessage,
        meta: {
          title: '我的消息',
          index: '15',
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
      icon: 'el-icon-star-on',
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
];

export default new Router({
  routes: router,
  mode: 'history'
})
