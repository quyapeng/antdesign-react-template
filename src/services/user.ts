import request from '@/utils/request';
const user_url = 'user';

export async function userList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(user_url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** update PATCH  */
export async function updateType(options?: { [key: string]: any }) {
  return request(user_url, {
    method: 'PATCH',
    data: options,
    ...(options || {}),
  });
}
/** add POST */
export async function addType(options?: { [key: string]: any }) {
  return request(user_url, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

export async function sourceList(options?: { [key: string]: any }) {
  return request(user_url, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}
