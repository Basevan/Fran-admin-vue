import request from '@/utils/request';

export const getMenu = async (params) => {
  return request({
    method: 'get',
    url: '/menu/getAllMenu',
    params: params
  })
};
