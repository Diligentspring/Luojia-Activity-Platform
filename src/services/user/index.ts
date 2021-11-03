import responseHandler from '@/utils/response-handler';
import ListBody from 'antd/lib/transfer/ListBody';
import request from 'umi-request';
import { BasicResponseType, LoginAndRegisterRequestParams, UserInfoType } from '../typings';

// 用户登录
export async function login(params: LoginAndRegisterRequestParams) {
  return request('/api/user/login', {
    method: 'GET',
    params: { ...params },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 用户注册
export async function register(body: LoginAndRegisterRequestParams) {
  return request('/api/user/register', {
    method: 'POST',
    
    data: body,
    headers:{'Content-Type': 'application/json',}
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 用户登录
export async function fetchCurrentUser() {
  return request('/api/user/currentUser', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res: BasicResponseType<UserInfoType>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 退出登录
export async function logout() {
  return request('/api/user/logout', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 修改用户信息
export async function UpdateUserInfo(body?: Partial<UserInfoType>) {
  return request('/api/user/update', {
    method: 'POST',
    credentials: 'include',
    data:body,
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}
