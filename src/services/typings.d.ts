// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = any;
  // {
  //   // username?: string;
  //   // // id: number;
  //   // isFirst?: boolean;
  //   // lastLoginTime?: string;
  //   // realName?: string;
  //   // roles?: {
  //   //   accPrefix: string;
  //   //   code: string;
  //   //   createTime: string;
  //   //   id: number;
  //   //   menus: [];
  //   //   name: string;
  //   //   status: string;
  //   //   subRoles: [];
  //   //   type: string;
  //   //   weight: number;
  //   // }[];
  //   // // status: string;
  //   // updateTime?: string;
  //   menu?: {}[];
  // };

  type LoginResult = {
    status: any;
  };
  type LoginParams = {
    // grant_type: string;
    // scope: string;
    rememberMe: boolean;
    username: string;
    password: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
    name?: string;
  };
  // 角色
  type RoleItem = {
    name: string;
  };

  type UserItem = {
    name: string;
    mobile: string;
    roleId: number;
    password: string;
    status: string;
  };

  interface Option {
    value: string;
    label: string;
    children?: Option[];
    isLeaf?: boolean;
    loading?: boolean;
  }
  interface OSSDataType {
    key: string;
    dir: string;
    expire: string;
    host: string;
    OSSAccessKeyId: string;
    policy: string;
    signature: string;
    callback: string;
  }
}

declare module 'md5';
