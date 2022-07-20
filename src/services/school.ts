import request from '@/utils/request';
const school_url = 'operation/school';

export async function getList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(school_url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function handleSchool(method: string, options?: { [key: string]: any }) {
  //
  const id = method == 'POST' ? '' : `/${options?.id}`;
  return request(`${school_url}${id}`, {
    method,
    data: options,
    ...(options || {}),
  });
}
