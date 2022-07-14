// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';
const role_url = 'role';
const login_url = 'authenticate';
const menu_url = 'menu';

/** 登录 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request(login_url, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 菜单 */
export async function currentMenu(options?: { [key: string]: any }) {
  return request('menu/me', {
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

// /role/1/menus
export async function setMenuPower(options?: { [key: string]: any }) {
  const { id, menu }: any = options;
  return request(`${role_url}/${id}/${menu_url}s`, {
    method: 'PATCH',
    data: menu,
    ...(options || {}),
  });
}

export async function menuList(options?: { [key: string]: any }) {
  return request(`${menu_url}/all`, {
    method: 'GET',
    params: {
      ...options,
    },
  });
}

export async function addMenu(options?: { [key: string]: any }) {
  const { id }: any = options;
  let ID = id ? `/${id}` : '';
  return request(`${menu_url}${ID}`, {
    method: id ? 'PATCH' : 'POST',
    data: options,
    ...(options || {}),
  });
}

export async function getMenu(method: string, options?: { [key: string]: any }) {
  //
  return request(`${menu_url}/${options?.id}`, {
    method,
    params: {
      ...options,
    },
  });
}

