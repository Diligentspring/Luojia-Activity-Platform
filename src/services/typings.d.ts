export interface BasicResponseType<T> {
  code: number; // 0: 失败; 1: 成功
  msg: string;
  data?: T;
}

export type UserInfoType = API.currentUser;

export interface LoginAndRegisterRequestParams {
  username: string;
  password: string;
}
