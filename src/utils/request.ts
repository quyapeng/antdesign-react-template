import { message } from 'antd';
import { xsrfHeaderName } from '@/constant/index';
import { codeMessage } from '@/constant/error';
import { extend } from 'umi-request';

const errorHandler = (error: any) => {
  const { response = {} } = error;
  const key = Object.keys(error?.data?.errors)[0];
  const value = Object.values(error.data.errors)[0];
  const errortext = codeMessage[response.status] || response.statusText || `${key}: ${value}`;
  console.log('error', error);
  const { status, url } = response;

  message.error({
    content: `请求错误 ${status}: ${errortext}`,
  });
};
const request = extend({
  errorHandler, // 默认错误处理
  prefix: 'https://dev-api.qlion.com/struggle/',
  // 默认请求头
  headers: {
    authorization: localStorage.getItem(xsrfHeaderName), // 携带token
  } as HeadersInit,
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  return {
    options: {
      ...options,
    },
  };
});

request.interceptors.response.use((response) => {
  const { status } = response;
  if (status !== 200) {
    message.error({
      content: `${status}: 请求失败`,
    });
  }
  return response;
});

export default request;
