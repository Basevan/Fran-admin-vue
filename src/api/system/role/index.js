import request from '../../../utils/request';

export const roleList = async (params) => {
  return request({
    method: 'get',
    url: '/system/role/list',
    params: params
  })
};

export const changeStatus = async (params) => {
  return request({
    method: 'post',
    url: '/system/role/status',
    data: params
  })
};

export const save = async (params) => {
  return request({
    method: 'post',
    url: '/system/role/save',
    data: params
  })
};

export const roleUserList = async (params) => {
  return request({
    method: 'get',
    url: '/system/role/user/list',
    params: params
  })
};

export const saveRoleUser = async (params) => {
  return request({
    method: 'post',
    url: '/system/role/user/save',
    data: params
  })
};

export const delRoleUser = async (params) => {
  return request({
    method: 'post',
    url: '/system/role/user/delete',
    data: params
  })
};

export const permissionList = async () => {
  return request({
    method: 'get',
    url: '/system/role/permission/list',
  })
};

export const rolePermissionList = async (params) => {
  return request({
    method: 'get',
    url: '/system/role/rolePermission/list',
    params: params
  })
};

export const updateRolePermissionList = async (params) => {
  return request({
    method: 'post',
    url: '/system/role/permission/update',
    data: params
  })
};
