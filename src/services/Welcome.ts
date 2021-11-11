import responseHandler from '@/utils/response-handler';
import request from 'umi-request';
import { BasicResponseType } from './typings';

export async function ActsumApplication() {
  return request('/api/activity/activitystatistics', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res: number) => {

      console.log(res)
      return res;
    })
    .catch((err) => console.log(err));
}

export async function usersumApplication() {
    return request('/api/user/userstatistics', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res: number) => {
  
        console.log(res)
        return res;
      })
      .catch((err) => console.log(err));
  }

  export async function ActprogressApplication() {
    return request('/api/activity/activityinprogress', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res: number) => {
  
        console.log(res)
        return res;
      })
      .catch((err) => console.log(err));
  }