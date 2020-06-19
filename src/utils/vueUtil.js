import router from '../router/index.js';

/**
 * 回到上一页
 * @param route {String} 如果没有上一页回到指定页面，默认首页
 */
export const $goBack = (route = '/') => window.history.length > 1 ? router.go(-1) : router.push(route);
