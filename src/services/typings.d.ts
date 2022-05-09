// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    username?: string;
    id: number;
    isDelete?: boolean;
    isFirst?: boolean;
    lastLoginTime?: string;
    realName?: string;
    roles?: {
      accPrefix: string;
      code: string;
      createTime: string;
      id: number;
      menus: [];
      name: string;
      status: string;
      subRoles: [];
      type: string;
      weight: number;
    }[];
    status: string;
    updateTime?: string;
  };

  type LoginResult = {
    status: any;
  };
  type LoginParams = {
    grant_type: string;
    scope: string;
    username: string;
    password: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
