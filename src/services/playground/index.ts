import { ActivityProps } from '@/components/Activity';
import { StatusType } from '@/components/Activity/status';
import responseHandler from '@/utils/response-handler';
import request from 'umi-request';
import { BasicResponseType } from '../typings';

// 获取全部活动
export async function getAllActivities(params?: {}) {
  return request('/api/activity/getall', {
    method: 'GET',
    params: { ...params },
    credentials: 'include',
  }).then((res: BasicResponseType<ActivityProps[]>) => {
    return responseHandler(res);
  });
}

// 按条件查询活动
export async function getFilteredActivities(params?: { key: StatusType }) {
  return request('/api/activity/filter', {
    method: 'GET',
    params: { ...params },
    credentials: 'include',
  }).then((res: BasicResponseType<ActivityProps[]>) => {
    return responseHandler(res);
  });
}

// 报名参加活动
export async function activityApply(params?: { activity_ID: string }) {
  return request('/api/activity/register', {
    method: 'POST',
    params: { actid: params?.activity_ID },
    credentials: 'include',
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 取消报名
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

// 点赞
export async function likeThisActivity(params: { activity_ID: string }) {
  return request('/api/activity/likeactivity', {
    method: 'POST',
    credentials: 'include',
    params: { actid: params.activity_ID },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 点踩
export async function hateThisActivity(params: { activity_ID: string }) {
  return request('/api/activity/hateactivity', {
    method: 'POST',
    credentials: 'include',
    params: { actid: params.activity_ID },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 取消点赞
export async function cancelLike(params: { activity_ID: string }) {
  return request('/api/activity/cancellike', {
    method: 'POST',
    credentials: 'include',
    params: { actid: params.activity_ID },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 取消点踩
export async function cancelhate(params: { activity_ID: string }) {
  return request('/api/activity/cancelhate', {
    method: 'POST',
    credentials: 'include',
    params: { actid: params.activity_ID },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}
