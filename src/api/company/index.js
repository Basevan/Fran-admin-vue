import request from '@/utils/request'

export const departmentList  = async (params) => {
  return request({
    method: 'get',
    url: '/company/department/list',
    params: params
  })
};

export const jobList  = async (params) => {
  return request({
    method: 'get',
    url: '/company/job/list',
    params: params
  })
};
