import { BasicResponseType } from '@/services/typings';
import { message } from 'antd';

export default function responseHandler(res: BasicResponseType<any>) {
  if (res.code === 1) {
    //  message.success(res.msg);
    return res;
  } else return message.error(res.msg);
}
