export const setLocaleInfo = (list: ArrayStorage[]) => {
  if (list && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      let { name, value } = list[i];
      localStorage.setItem(name, value);
    }
  }
};
export const getLocaleInfo = (name: string) => {
  return localStorage.getItem(name);
};

interface ArrayStorage {
  name: string;
  value: string;
}

export const commonRequestList = (name: any, params: any) => {
  let { current: page, pageSize: size } = params;
  let response = name({ page: page - 1, size }).then((res: any) => {
    let {
      status,
      data: {
        content,
        totalElements: total,
        pageable: { pageNumber, pageSize },
      },
    } = res;
    if (status != 200) return;
    return {
      data: content,
      total,
      success: status == 200,
      pageSize,
      current: pageNumber + 1,
    };
  });
  return Promise.resolve(response);
};
