import { ActivityProps } from '@/components/Activity';
import { StatusType } from '@/components/Activity/status';
import responseHandler from '@/utils/response-handler';
import request from 'umi-request';
import { BasicResponseType } from '../typings';

export async function getAllActivities(params?: {}) {
  return request('/api/activity/getall', {
    method: 'GET',
    params: { ...params },
    credentials: 'include',
  }).then((res: BasicResponseType<ActivityProps[]>) => {
    return responseHandler(res);
  });
}

export async function getFilteredActivities(params?: { key: StatusType }) {
  return request('/api/activity/filter', {
    method: 'GET',
    params: { ...params },
    credentials: 'include',
  }).then((res: BasicResponseType<ActivityProps[]>) => {
    return responseHandler(res);
  });
}

export async function activityApply(params?: { activity_ID: string }) {
  return request('/api/activity/register', {
    method: 'POST',
    params: { ...params },
    credentials: 'include',
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

export async function cancelApplication(params: { activity_ID: string }) {
  return request('/api/activity/quit', {
    method: 'POST',
    credentials: 'include',
    params: { ...params },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}
