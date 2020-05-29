import request from '@/utils/request'

export const employeeList  = async (params) => {
  return request({
    method: 'get',
    url: '/company/employee/list',
    params: params
  })
};

export const delEmployee  = async (params) => {
  return request({
    method: 'post',
    url: '/company/employee/del',
    data: params
  })
};


