export const xsrfHeaderName = 'authorization';

// 认证类型
export const AUTH_TYPE = {
  BEARER: 'bearer',
  BASIC: 'basic',
};

export type stringObject = {
  [x: string]: string;
};
export const operateMap: stringObject = {
  operate: '操作',
  create: '新增',
  modify: '编辑',
  delete: '删除',
};

export const pagination = {
  page: 0,
  size: 10,
};

export const STATUS_CODE = [
  {
    value: '0',
    label: '待激活',
  },
  {
    value: '1',
    label: '正常',
  },
  {
    value: '2',
    label: '禁用',
  },
];

export const ROLE_CODE = [
  {
    value: '0',
    label: '系统角色',
  },
  {
    value: '1',
    label: '业务角色',
  },
];
