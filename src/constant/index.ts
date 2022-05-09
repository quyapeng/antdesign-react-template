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
