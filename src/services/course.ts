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

export async function sourceList(options?: { [key: string]: any }) {
  return request(course_url, {
    method: 'GET',
    params: {
      ...options,
    },
  });
}

// 课程分类
export async function categoryList() {
  return request(`${course_url}/category`, {
    method: 'GET',
  });
}

// activity
export async function activityList() {
  return request(`${course_url}/activity`, {
    method: 'GET',
  });
}

export async function activitySubList(id: number | string) {
  return request(`${course_url}/activity/${id}`, {
    method: 'GET',
  });
}
