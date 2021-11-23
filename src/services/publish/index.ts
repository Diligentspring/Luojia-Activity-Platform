import { ActivityProps } from '@/components/Activity';
import { StatusType } from '@/components/Activity/status';
import responseHandler from '@/utils/response-handler';
import request from 'umi-request';
import { BasicResponseType } from '../typings';

export async function publishApplication(body: { data: ActivityProps }) {
  return request('/api/activity/publish', {
    method: 'POST',
    credentials: 'include',
    ...body,
  })
    .then((res: BasicResponseType<null>) => {
      return responseHandler(res);
    })
    .catch((err) => console.log(err));
}
