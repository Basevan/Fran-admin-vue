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
}
