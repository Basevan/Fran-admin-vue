import request from '../../../utils/request';

export const roleList = async (params) => {
  return request({
    method: 'get',
    url: '/role/list',
    params: params
  })
};

export const changeStatus = async (params) => {
  return request({
    method: 'post',
    url: '/role/status',
    data: params
  })
};

export const save = async (params) => {
  return request({
    method: 'post',
    url: '/role/save',
    data: params
  })
};

export const roleUserList = async (params) => {
  return request({
    method: 'get',
    url: '/role/user/list',
    params: params
  })
};

export const saveRoleUser = async (params) => {
  return request({
    method: 'post',
    url: '/role/user/save',
    data: params
  })
};
