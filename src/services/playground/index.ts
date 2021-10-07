import { ActivityProps } from '@/components/Activity';
import { StatusType } from '@/components/Activity/status';
import responseHandler from '@/utils/response-handler';
import { request } from 'umi';
import { BasicResponseType } from '../typings';

export async function getAllActivities(params?: {}) {
  return request('/api/getall', {
    method: 'GET',
    params: { ...params },
  }).then((res: BasicResponseType<ActivityProps[]>) => {
    return responseHandler(res);
  });
}

export async function getFilteredActivities(params?: { key: StatusType }) {
  return request('/api/filter', {
    method: 'GET',
    params: { ...params },
  }).then((res: BasicResponseType<ActivityProps[]>) => {
    return responseHandler(res);
  });
}
