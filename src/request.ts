import { extend } from 'umi-request';

export const request = extend({
  prefix: 'http://www.account-book.top:3000',
  timeout: 1000,
  credentials: 'include', // 请求携带cookie
});
