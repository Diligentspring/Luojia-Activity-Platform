export interface BasicResponseType<T> {
  code: number; // 0: 失败; 1: 成功
  msg: string;
  data?: T;
}

export interface UserInfoType {
  userid?: number;
  username?: string;
  password?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  birthdate?: string;
  sex?: string;
  major?: string;
}

export interface LoginAndRegisterRequestParams {
  username: string;
  password: string;
}
