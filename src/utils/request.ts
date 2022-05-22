import axios from 'axios';
import { message } from 'antd';
import { xsrfHeaderName, AUTH_TYPE } from '@/constant/index';

const request = axios.create({
  baseURL: 'https://dev-api.qlion.com',
  xsrfHeaderName,
  timeout: 5000,
  withCredentials: true,
});

request.interceptors.response.use((option: any) => {
  let { status, statusText, data } = option;
  if (status == '200') {
    return data;
  } else {
    message.error(statusText);
  }
  //   return option;
});
//请求拦截
request.interceptors.request.use((option: any) => {
  let { url } = option;
  //获取token
  const token = localStorage.getItem(xsrfHeaderName) || '';
  if (url === '/login/oauth/token') {
    option.headers[xsrfHeaderName] = `${AUTH_TYPE.BASIC} Y2xpZW50OjEyMzQ1Ng==`;
    option.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    option.headers[xsrfHeaderName] = `${token}`;
  }
  return option;
});

export default request;
