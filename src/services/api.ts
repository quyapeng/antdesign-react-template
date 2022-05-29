// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';
const role_url = '/struggle/authority';

/** 登录 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request('/struggle/authenticate', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 菜单 */
export async function currentMenu(options?: { [key: string]: any }) {
  return request('/struggle/menu/me', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function role(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(role_url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** update PATCH  */
export async function updateRole(options?: { [key: string]: any }) {
  return request(`${role_url}/${options?.id}`, {
    method: 'PATCH',
    data: options,
    ...(options || {}),
  });
}
/** add POST */
export async function addRole(options?: { [key: string]: any }) {
  return request(role_url, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

export async function menuList(options?: { [key: string]: any }) {
  return request('/struggle/menu/all', {
    method: 'GET',
    params: {
      ...options,
    },
  });
}
