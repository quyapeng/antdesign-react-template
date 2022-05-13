// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';
import qs from 'qs';

/** 获取当前的用户 */
export async function currentUser(options?: { [key: string]: any }) {
  return request('/login/user/admin/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request('/login/oauth/token', {
    method: 'POST',
    data: `${qs.stringify(body)}`,
    ...(options || {}),
  });
}

/** 菜单 */
export async function currentMenu(options?: { [key: string]: any }) {
  return request('/login/menu', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** /login/role?page=0&size=10 */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** /login/role?page=0&size=10 */
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
  return request('/login/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
