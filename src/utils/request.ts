// import axios from 'axios';
// import { message } from 'antd';
// import { xsrfHeaderName, AUTH_TYPE } from '@/constant/index';

// const request = axios.create({
//   baseURL: 'https://dev-api.qlion.com',
//   xsrfHeaderName,
//   timeout: 5000,
//   withCredentials: true,
// });

// request.interceptors.response.use((option: any) => {
//   console.log('option', option);
//   let { status, statusText, data } = option;
//   if (status == '200') {
//     return data;
//   } else {
//     message.error(statusText);
//   }
//   //   return option;
// });
// //请求拦截
// request.interceptors.request.use((option: any) => {
//   let { url } = option;
//   //获取token
//   const token = localStorage.getItem(xsrfHeaderName) || '';
//   if (url === '/login/oauth/token') {
//     option.headers[xsrfHeaderName] = `${AUTH_TYPE.BASIC} Y2xpZW50OjEyMzQ1Ng==`;
//     option.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   } else {
//     option.headers[xsrfHeaderName] = `${token}`;
//   }
//   return option;
// });

// export default request;
import { message } from 'antd';
import { xsrfHeaderName, AUTH_TYPE } from '@/constant/index';
import { codeMessage } from '@/constant/error';
import { extend } from 'umi-request';

const errorHandler = (error: any) => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  debugger;

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

request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  const { status, message: msg } = res;

  if (status !== 200) {
    console.log('error', status);
    message.error({
      content: `${status}: ${msg}`,
    });
    return;
  }
  return res.data;
});

export default request;
