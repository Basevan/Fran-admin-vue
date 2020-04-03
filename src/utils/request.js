import axios from 'axios';
import { Notification } from 'element-ui';
import Cookies from 'js-cookie';
// import { getLangMessage } from '@/utils';
import router from '@/router/index';
import store from '@/store/index';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const ajax = axios.create({
  baseURL: '/apis/',
  timeout: 90000,
  withCredentials: true,
  token: encodeURIComponent(Cookies.get('FRAN_ADMIN_TOKEN') || 0),
  appId: '33273003751',
});

// 请求参数增加操作者
function paramsPrefix(options, type) {
  options[type] = {
    ...options[type],
  };
}

//请求响应拦截
const request = async (options) => {
  try {
    if (['get', 'delete'].includes(options.method.toLowerCase())) {
      paramsPrefix(options, 'params');
    } else {
      paramsPrefix(options, 'data');
    }
    const response = await ajax(options);
    checkStatus(response);
    const data = await response.data;
    if (data.code !== 200) {

      // 未登录
      if (data.code === 601) {
        const url = `${data.data.manageLoginAddress}/login?redirectUrl=${encodeURIComponent(window.location.href)}`;
        return window.location.href = url;
      }

      // 没有权限
      if (data.code === 502 && options.isRedirect) {
        router.replace('/noPermission');
        return {
          code: 502,
          message: 'noPermission'
        };
      }

      setTimeout(() => {
        Notification.error({
          title: 'error',
          message: data.msg
        });
      }, 0);
    }

    return {

      data
    };
  } catch (err) {
    Notification.error({
      title: 'error',
      message: 'systemError'
    });
  }
};

export default request;


// import axios from 'axios'
// import { Notification, MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
//
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// // 创建axios实例
// const service = axios.create({
//   // axios中请求配置有baseURL选项，表示请求URL公共部分
//   baseURL: process.env.VUE_APP_BASE_API,
//   // 超时
//   timeout: 10000
// })
// // request拦截器
// service.interceptors.request.use(
//   config => {
//     if (getToken()) {
//       config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     Promise.reject(error)
//   }
// )
//
// // 响应拦截器
// service.interceptors.response.use(res => {
//     const code = res.data.code
//     if (code === 401) {
//       MessageBox.confirm(
//         '登录状态已过期，您可以继续留在该页面，或者重新登录',
//         '系统提示',
//         {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }
//       ).then(() => {
//         store.dispatch('LogOut').then(() => {
//           location.reload() // 为了重新实例化vue-router对象 避免bug
//         })
//       })
//     } else if (code !== 200) {
//       Notification.error({
//         title: res.data.msg
//       })
//       return Promise.reject('error')
//     } else {
//       return res.data
//     }
//   },
//   error => {
//     console.log('err' + error)
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )
//
// export default service
