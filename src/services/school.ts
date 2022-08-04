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

export async function foodTemplate() {
  return request(`recipe`, {
    method: 'GET',
  });
}

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
const teacher_url = 'school/teacher';
export async function getTeacherList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(`${teacher_url}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
//
export async function handleTeacher(method: string, options?: { [key: string]: any }) {
  const ID = method == 'POST' ? '' : `/${options?.id}`;
  const PWD = options?.pwd ? `/password/${options?.pwd}` : '';
  // /school/teacher/1/password/1'
  return request(`${teacher_url}${ID}${PWD}`, {
    method,
    data: options,
    ...(options || {}),
  });
}

// allTeacher
export async function allTeacher(options?: { [key: string]: any }) {
  return request(`${teacher_url}s`, {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getStudentList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(`school/student`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function handleStudent(method: string, options?: { [key: string]: any }) {
  //
  const ID = method == 'POST' ? '' : `/${options?.id}`;
  // /school/teacher/1/password/1'
  return request(`school/student${ID}`, {
    method,
    data: options,
    ...(options || {}),
  });
}

export async function orderById(options: { [key: string]: any }) {
  return request(`school/order`, {
    method: 'GET',
    params: options,
  });
}

export async function handleOrder(method: string, options?: { [key: string]: any }) {
  const ID = method == 'POST' ? '' : `/${options?.id}`;
  // const options.endDate ? -> 停课
  return request(`school/order${ID}`, {
    method,
    data: options,
    ...(options || {}),
  });
}

export async function allClassroom(options?: { [key: string]: any }) {
  return request(`school/classsrooms`, {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getAttendance(
  params: {
    page?: number;
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(`school/attendance`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// school/order/1/status/SUSPENDED
const calendar_url = 'school/calendar';
export async function getCalendarList(
  params: {
    page?: number;
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(`${calendar_url}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFoodList(options?: { [key: string]: any }) {
  return request(`school/recipe`, {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

//
export async function getNoticeList(
  params: {
    page?: number;
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(`school/announcement`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function handleNotice(method: string, options?: { [key: string]: any }) {
  const ID = method == 'POST' ? '' : `/${options?.id}`;
  // const options.endDate?-> 停课
  return request(`school/announcement${ID}`, {
    method,
    data: options,
    ...(options || {}),
  });
}

export async function handleCalendar(options?: { [key: string]: any }) {
  return request(`${calendar_url}`, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

const class_url = 'school/classroom';
export async function classList(
  params: {
    page?: number;
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(`${class_url}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
// schoolId

export async function handleClass(options?: { [key: string]: any }) {
  return request(`school/classsroom/${options?.id}`, {
    method: 'PATCH',
    data: options,
    ...(options || {}),
  });
}

export async function getCalendarDetail(id: string | number, month: string) {
  return request(`school/calendar/holiday/schoolcalendar/${id}/month/${month}`, {
    method: 'GET',
  });
}
//
export async function allMeals() {
  return request(`recipe/meals`, {
    method: 'GET',
  });
}
//

export async function setMeal(options?: { [key: string]: any }) {
  return request(`school/recipe/${options?.id}/meal`, {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

//
export async function allRecipe() {
  return request(`recipe`, {
    method: 'GET',
  });
}

export async function getRecipeDetail(id: string | undefined) {
  return request(`school/recipe/${id}/wall`, {
    method: 'GET',
  });
}
//
export async function setRecipeWall(options?: { [key: string]: any }) {
  const { recipeId, month, week }: any = options;
  return request(`recipe/wall/recipe/${recipeId}/month/${month}/week/${week}`, {
    method: 'PATCH',
    data: options?.data,
  });
}

//
const sus_url = 'school/suspension';
export async function getSuspenseList(
  params: {
    // query
    page?: number;
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request(sus_url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function handleSuspense(method: string, options?: { [key: string]: any }) {
  const ID = method == 'POST' ? '' : `/${options?.id}`;

  return request(`${sus_url}${ID}`, {
    method,
    data: options,
    ...(options || {}),
  });
}
