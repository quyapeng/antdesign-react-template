import { message } from 'antd';
import { xsrfHeaderName, AUTH_TYPE } from '@/constant/index';
import { codeMessage } from '@/constant/error';
import { extend } from 'umi-request';

const errorHandler = (error: any) => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  message.error({
    content: `请求错误 ${status}: ${errortext}`,
  });
};
const request = extend({
  errorHandler, // 默认错误处理
  prefix: 'https://dev-api.qlion.com',
  // 默认请求头
  headers: {
    Authorization: localStorage.getItem(xsrfHeaderName), // 携带token
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
