import { ActivityProps } from '@/components/Activity';
import { CommentItemProps } from '@/pages/comments';
import responseHandler from '@/utils/response-handler';
import request from 'umi-request';
import { BasicResponseType } from '../typings';

// 获取某活动下的所有评论
export async function getCommentsByActivityId(activity_ID: string) {
  return request('/api/activity/showactcomment', {
    method: 'GET',
    params: { actid: parseInt(activity_ID) },
    credentials: 'include',
  })
    .then((res: BasicResponseType<CommentItemProps[]>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 为某活动添加评论
export async function submitComment(params?: { actid: string; content: string }) {
  return request('/api/activity/addcomment', {
    method: 'POST',
    body: JSON.stringify({ ...params }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}

// 根据id查询活动详情
export async function queryActivityDetailById(params?: { actid: string }) {
  return request('/api/activity/showactdetail', {
    method: 'GET',
    params: { ...params },
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res: BasicResponseType<ActivityProps>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}
