import request from '@/utils/request';

export const login = async (params) => {
  return request({
    method: 'post',
    url: '/system/user/login',
    data: params
  })
};

export const userDetail = async (params) => {
  return request({
    method: 'post',
    url: '/system/user/detail',
    data: params
  })
};

export const userList = async (params) => {
  return request({
    method: 'post',
    url: '/system/user/list',
    data: params
  })
};

export const status = async (params) => {
  return request({
    method: 'post',
    url: '/system/user/status',
    data: params
  })
};
