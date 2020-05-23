import Vue from 'vue'
import Router from 'vue-router';
import MyMessage from "../views/message/MyMessage";
import MyProcess from "../views/process/MyProcess";
import layout from "../views/layout/Layout.vue";


Vue.use(Router)

export const router = [
  {
    path: '',
    hidden: false,
    component: layout,
    redirect: '/login',
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
    path: '',
    component: layout,
    meta: {
      title: '公司管理',
      icon: 'el-icon-office-building',
      index: '3',
    },
    children: [
      {
        path: '/company/employee',
        name: 'employee',
        component: () => import('../views/company/employee/Employee'),
        meta: {
          title: '员工管理',
          index: '4',
        },
      },
      {
        path: '/company/job',
        name: 'job',
        component: () => import('../views/company/job/Job'),
        meta: {
          title: '岗位管理',
          index: '5',
        },
      },
      {
        path: '/company/department',
        name: 'department',
        component: () => import('../views/company/depaerment/Department'),
        meta: {
          title: '部门管理',
          index: '6',
        },
      },
      {
        path: '/company/title',
        name: 'title',
        component: () => import('../views/company/Title'),
        meta: {
          title: '职称管理',
          index: '7',
        },
      },
    ]
  },
  {
    path: '',
    component: layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting',
      index: '8'
    },
    children: [
      {
        path: '/system/user',
        name: 'user',
        component: () => import('../views/system/User'),
        meta: {
          title: '用户管理',
          index: '9',
        },
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('../views/system/role/Role'),
        meta: {
          title: '角色管理',
          index: '10',
        },
      },
      {
        path: '/system/role/user',
        name: 'roleUser',
        component: () => import('../views/system/role/RoleUser'),
        meta: {
          title: '角色分配用户',
          index: '101',
        },
        hidden: true,
      },
      {
        path: '/system/permission/list',
        name: 'permissions',
        component: () => import('../views/system/permission/List'),
        meta: {
          title: '权限列表',
          index: '19',
        },
        hidden: false,
      },
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('../views/system/Menu'),
        meta: {
          title: '菜单管理',
          index: '11',
        },
      },
      {
        path: '/system/dictionary',
        name: 'dictionary',
        component: () => import('../views/system/Dictionary'),
        meta: {
          title: '字典管理',
          index: '12',
        },
      },
      {
        path: '/system/parameter',
        name: 'parameter',
        component: () => import('../views/system/Parameter'),
        meta: {
          title: '参数设置',
          index: '13',
        },
      },
      {
        path: '/system/log',
        name: 'log',
        component: () => import('../views/system/Log'),
        meta: {
          title: '日志管理',
          index: '14',
        },
      }
    ]
  },
  {
    path: '',
    component: layout,
    meta: {
      title: '消息',
      icon: 'el-icon-chat-line-round',
      index: '15',
    },
    children: [
      {
        path: '/message/my',
        name: 'message',
        component: MyMessage,
        meta: {
          title: '我的消息',
          index: '16',
        },
      }
    ]
  },
  {
    path: '',
    component: layout,
    meta: {
      title: '流程',
      icon: 'el-icon-star-on',
      index: '17',
    },
    children: [
      {
        path: '/process/my',
        name: 'process',
        component: MyProcess,
        meta: {
          title: '流程',
          index: '18',
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
    },
    hidden: true
  },
  {
    path: '/noPermission',
    component: () => import(/* webpackChunkName: "NoPermisson" */ '../views/error/NoPermisson.vue'),
    hidden: true
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "NotFind" */ '../views/error/NotFind.vue'),
    hidden: true
  },
  {
    path: '/company/employee/detail',
    name: 'employeeDetail',
    component: () => import('../views/company/employee/EmployeeDetail'),
    meta: {
      title: '员工信息详情',
      index: '41',
    },
    hidden: true
  },
];

export default new Router({
  routes: router,
  mode: 'history'
})
