import { message } from 'antd';
import { xsrfHeaderName } from '@/constant/index';
import { codeMessage } from '@/constant/error';
import { extend } from 'umi-request';

const errorHandler = (error: any) => {
  const { response = {} } = error;
  const errors = error.data.errors || error?.data?.message || '';
  const key = !errors ? Object.keys(error?.data?.errors)[0] : errors;
  const value = !errors ? Object.values(error.data.errors)[0] : errors;
  const errortext =
    codeMessage[response.status] || response.statusText || errors ? errors : `${key}: ${value}`;
  const { status, url } = response;
  const text =
    typeof errortext == 'object'
      ? Object.keys(errortext)[0] + Object.values(errortext)[0]
      : errortext;
  message.error({
    content: `请求错误 ${status}: ${text || errortext}`,
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

request.interceptors.response.use((response, b) => {
  const { status } = response;
  // if (status !== 200) {
  //   message.error({
  //     content: `${status}: 请求失败`,
  //   });
  // }
  return response;
});

export default request;
