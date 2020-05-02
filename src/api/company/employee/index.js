import request from '@/utils/request'

export const employeeList  = async () => {
  return request({
    method: 'get',
    url: '/company/employee/list'
  })
};
