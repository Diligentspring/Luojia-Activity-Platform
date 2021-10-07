export interface BasicResponseType<T> {
  code: number; // 0: 失败; 1: 成功
  msg: string;
  res?: T;
}
