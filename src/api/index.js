// 接口

import request from '@/utils/request';

export const login = async (params) => {
  return request({
    method: 'post',
    url: '/user/login',
    data: params
  })
};

