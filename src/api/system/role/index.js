import request from '../../../utils/request';

export const roleList = async (params) => {
  return request({
    method: 'get',
    url: '/role/list',
    params: params
  })
};
