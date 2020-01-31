import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import First from '../components/form/First'
import Second from "../components/form/Second";
import HomePage from "../components/home/HomePage";
import MyMessage from "../components/myMessage/MyMessage";


Vue.use(Router)

const router = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
    component: Vue,
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/homepage',
    component: () => import('../components/home/Layout'),
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
        component: () => import('../components/editMenu/Layout'),
        children: [
          {
            path: '/edit/add',
            name: 'add',
            component: () => import('../components/editMenu/Create'),
          },
          {
            path: '/edit/tree',
            name: 'editTree',
            component: () => import('../components/editMenu/EditTree'),
            meta: {
              title: '编辑'
            },
            children: [
              {
                path: '/edit/edit',
                name: 'edit',
                component: () => import('../components/editMenu/Edit')
              }
            ]
          },
          {
            path: '/edit/editMenu',
            name: 'editMenu',
            component: () => import('../components/editMenu/EditMenu'),
            meta: {
              title: '编辑'
            },
          },
          {
            path: '/edit/newAdd',
            name: 'addNewImpl',
            component: () => import('../components/editMenu/CreateNewImpl')
          },
          {
            path: '/testForm',
            name: 'test',
            component: () => import('../components/form/testForm')
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
        component: () => import('../components/myProcess/MyProcess')
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
    component: () => import('../components/login/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/editMenu',
    name: 'editMenu',
    component: () => import('../components/form/Second')
  },
];

export default new Router({
  routes: router,
  mode: 'history'
})
