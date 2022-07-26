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

export async function changePWD(options?: { [key: string]: any }) {
  //
  const { pwd, id }: any = options;
  return request(`${school_url}/${id}/administrator/password`, {
    method: 'PATCH',
    data: pwd,
  });
}

export async function classroomList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  // /classsroom?page=0&size=15
  return request(`${school_url}/classroom`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function allSchool() {
  return request(`${school_url}/all`, {
    method: 'GET',
  });
}

//
export async function foodTemplate() {
  return request(`recipe`, {
    method: 'GET',
  });
}

//
export async function getMonitor(id: string) {
  return request(`school/${id}/monitors`, {
    method: 'GET',
  });
}

//
export async function handleClassroom(method: string, options?: { [key: string]: any }) {
  //
  const ID = method == 'POST' ? '' : `/${options?.id}`;
  return request(`${school_url}/classroom${ID}`, {
    method,
    data: options,
    ...(options || {}),
  });
}
