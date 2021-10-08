import { BasicResponseType, UserInfoType } from '@/services/typings';
import { Request, Response } from 'express';

const LoginResponse: BasicResponseType<null> = {
  code: 1,
  msg: '登录成功!',
};

const RegisterResponse: BasicResponseType<null> = { code: 1, msg: '注册成功!' };

const currentUserResponse: BasicResponseType<UserInfoType> = {
  code: 1,
  msg: '获取当前用户成功!',
  data: {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: 987654321,
    username: 'Serati Ma',
    email: 'antdesign@alipay.com',
    phone: '0752-268888888',
    birthdate: '2000-01-01',
    sex: 'female',
    major: '计算机科学与技术',
  },
};
export default {
  'GET /api/login': LoginResponse,
  'POST /api/register': RegisterResponse,
  'GET /api/currentUser': currentUserResponse,
};
