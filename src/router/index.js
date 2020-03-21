import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import First from '../views/form/First'
import Second from "../views/form/Second";
import HomePage from "../views/home/HomePage";
import MyMessage from "../views/myMessage/MyMessage";


Vue.use(Router)

const router = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
    component: Vue,
  },
  {
    path: '/homepage',
    mete: {
      title: '首页'
    },
    component: () => import('../views/layout/layout'),
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/homepage',
    component: () => import('../views/home/Layout'),
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        component: HomePage,
        meta: {
          title: '首页'
        },
      },
      {
        path: '/views',
        name: 'first',
        component: First,
        meta: {
          title: 'views'
        },
      },
      {
        path: '/edit',
        redirect: '/edit/editMenu',
        component: () => import('../views/editMenu/Layout'),
        children: [
          {
            path: '/edit/add',
            name: 'add',
            component: () => import('../views/editMenu/Create'),
          },
          {
            path: '/edit/tree',
            name: 'editTree',
            component: () => import('../views/editMenu/EditTree'),
            meta: {
              title: '编辑'
            },
            children: [
              {
                path: '/edit/edit',
                name: 'edit',
                component: () => import('../views/editMenu/Edit')
              }
            ]
          },
          {
            path: '/edit/editMenu',
            name: 'editMenu',
            component: () => import('../views/editMenu/EditMenu'),
            meta: {
              title: '编辑'
            },
          },
          {
            path: '/edit/newAdd',
            name: 'addNewImpl',
            component: () => import('../views/editMenu/CreateNewImpl')
          },
          {
            path: '/testForm',
            name: 'test',
            component: () => import('../views/form/testForm')
          }
        ]
      },
      {
        path: '/myMessage',
        name: 'myMessage',
        component: MyMessage
      },
      {
        path: '/myProcess',
        name: 'myProcess',
        component: () => import('../views/myProcess/MyProcess')
      },
      {
        path: '/second',
        name: 'second',
        component: Second
      },
    ]
  },
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
