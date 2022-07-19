import request from '@/utils/request';
const course_url = 'course';

/** update PATCH  */
export async function updateSource(options?: { [key: string]: any }) {
  return request(`${course_url}/${options?.id}`, {
    method: 'PATCH',
    data: options,
    ...(options || {}),
  });
}
/** add POST */
export async function addSource(options?: { [key: string]: any }) {
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
  return request(`${course_url}/activity/tree`, {
    method: 'GET',
  });
}

export async function activitySubList(id: number | string) {
  return request(`${course_url}/activity/${id}`, {
    method: 'GET',
  });
}

export async function handleSource(method: string, options?: { [key: string]: any }) {
  const id = method == 'POST' ? '' : `/${options?.id}`;
  const data = method == 'POST' ? { data: options } : {};
  return request(`${course_url}${id}`, {
    method,
    ...data,
    params: {
      ...options,
    },
  });
}
