import responseHandler from '@/utils/response-handler';
import { Alert, message } from 'antd';
import { request } from 'umi';
import { BasicResponseType } from '../typings';
interface LoginAndRegisterRequestParams {
  username: string;
  password: string;
}

// 用户登录
export async function login(params: LoginAndRegisterRequestParams) {
  return request('/api/login', {
    method: 'GET',
    params: { ...params },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 用户注册
export async function register(params: LoginAndRegisterRequestParams) {
  return request('api/register', {
    method: 'GET',
    params: { ...params },
  }).then((res: BasicResponseType<null>) => {
    return responseHandler(res);
  });
}
