import responseHandler from '@/utils/response-handler';
import request from 'umi-request';
import { BasicResponseType, LoginAndRegisterRequestParams, UserInfoType } from '../typings';

// 用户登录
export async function login(params: LoginAndRegisterRequestParams) {
  return request('/api/login', {
    method: 'GET',
    params: { ...params },
    credentials: 'include',
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 用户注册
export async function register(params: LoginAndRegisterRequestParams) {
  return request('api/register', {
    method: 'POST',
    params: { ...params },
    credentials: 'include',
  }).then((res: BasicResponseType<null>) => {
    return responseHandler(res);
  });
}

// 用户登录
export async function fetchCurrentUser() {
  return request('/api/currentUser', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res: BasicResponseType<UserInfoType>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}
