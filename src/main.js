// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入element-ui */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 引入axios*/
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;
/* 引入vuex */
import store from './store';

import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title){
    document.title = to.meta.title;
  }
  next()
});

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
