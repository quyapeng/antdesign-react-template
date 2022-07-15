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
  // console.log(params);
  let { current: page, pageSize: size } = params;
  delete params.current;
  delete params.pageSize;
  let response = name({ page: page - 1, size, ...params }).then((res: any) => {
    let {
      content,
      totalElements: total,
      pageable: { pageNumber, pageSize },
    } = res.data;
    return {
      data: content,
      total,
      success: true,
      pageSize,
      current: pageNumber + 1,
    };
  });
  return Promise.resolve(response);
};

import React from 'react';
import * as allIcons from '@ant-design/icons';
const toHump = (name: string) =>
  name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase());

export const formatMenu = (list: any) => {
  let menu: any = [];
  if (list && list.length > 0) {
    list.filter((i: any) => {
      const { icon, status, subMenus, path, name, type, show } = i;
      if (status == 'ENABLED') {
        let c: any = [];
        if (subMenus && subMenus.length > 0) {
          subMenus.filter((j: any) => {
            c.push({
              name: j.name,
              hideInMenu: !j.show,
              path: `/${path}/${j.path}`,
              parentKeys: [path],
              type: j.type,
            });
          });
        }
        const v4IconName = icon ? toHump(icon.replace(icon[0], icon[0].toUpperCase())) : '';
        const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
        const iconObj = NewIcon
          ? {
              icon: React.createElement(NewIcon),
            }
          : {};
        menu.push(
          Object.assign(
            {
              path: `/${path}`,
              routes: c,

              name,
              hideInMenu: !show,
              type,
            },
            iconObj,
          ),
        );
      }
    });
  }
  console.log('menu', menu);
  return menu;
};

export const blobToFile = (blob: any, filename: string) => {
  const file = new File([blob], filename, { type: blob.type, lastModified: +new Date() });
  return file;
};
