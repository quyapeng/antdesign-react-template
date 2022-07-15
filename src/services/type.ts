import request from '@/utils/request';
const course_url = 'course';

export async function type(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(course_url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** update PATCH  */
export async function updateType(options?: { [key: string]: any }) {
  return request(`${course_url}/${options?.id}`, {
    method: 'PATCH',
    data: options,
    ...(options || {}),
  });
}
/** add POST */
export async function addType(options?: { [key: string]: any }) {
  return request(course_url, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}
