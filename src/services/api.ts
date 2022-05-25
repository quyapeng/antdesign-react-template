// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

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
const role_url = '/struggle/authority';
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

/** 新建规则 PATCH /api/rule */
export async function updateRole(options?: { [key: string]: any }) {
  return request(`${role_url}/${options?.id}`, {
    method: 'PATCH',
    data: options,
    ...(options || {}),
  });
}

/** 新建规则 POST */
export async function addRole(options?: { [key: string]: any }) {
  return request(role_url, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

/** 删除规则 DELETE */
export async function removeRole(options?: { [key: string]: any }) {
  return request(role_url, {
    method: 'DELETE',
    ...(options || {}),
  });
}
