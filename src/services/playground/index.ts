import { StatusType } from '@/components/Activity/status';
import { request } from 'umi';

export async function getAllActivities(params?: {}) {
  return request('/api/getall', {
    method: 'GET',
    params: { ...params },
  }).then((res) => {
    return res;
  });
}

export async function getFilteredActivities(params?: { key: StatusType }) {
  return request('/api/filter', {
    method: 'GET',
    params: { ...params },
  }).then((res) => {
    return res;
  });
}
