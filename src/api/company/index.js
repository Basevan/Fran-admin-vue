import request from '@/utils/request'

export const departmentList  = async (params) => {
  return request({
    method: 'get',
    url: '/company/department/list',
    params: params
  })
};

export const departments  = async () => {
  return request({
    method: 'get',
    url: '/company/department/list/all',
  })
};

export const updateDepartment  = async (params) => {
  return request({
    method: 'post',
    url: '/company/department/update',
    data: params
  })
};

export const deleteDepartment  = async (params) => {
  return request({
    method: 'post',
    url: '/company/department/delete',
    data: params
  })
};

export const jobList  = async (params) => {
  return request({
    method: 'get',
    url: '/company/job/list',
    params: params
  })
};

export const updateJob  = async (params) => {
  return request({
    method: 'post',
    url: '/company/job/update',
    data: params
  })
};

export const delJob  = async (params) => {
  return request({
    method: 'post',
    url: '/company/job/delete',
    data: params
  })
};

export const titleList  = async (params) => {
  return request({
    method: 'get',
    url: '/company/title/list',
    params: params
  })
};

