export const xsrfHeaderName = 'authorization';

// 认证类型
export const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'Basic',
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
    value: 'PENDING',
    label: '待激活',
  },
  {
    value: 'NORMAL',
    label: '正常',
  },
  {
    value: 'SUSPENDED',
    label: '禁用',
  },
];

export const ROLE_CODE = [
  {
    value: 'SYS',
    label: '系统',
  },
  {
    value: 'STAFF',
    label: '员工',
  },
  {
    value: 'USER',
    label: '用户',
  },
];

export const ROLE_CODE_EUM = {
  SYS: {
    value: 'SYS',
    text: '系统',
  },
  STAFF: {
    value: 'STAFF',
    text: '员工',
  },
  USER: {
    value: 'USER',
    text: '用户',
  },
};

export const TYPE = [
  {
    value: 'MENU',
    label: '菜单',
  },
  {
    value: 'ACTION',
    label: '权限',
  },
];

export const SHOW = [
  {
    value: true,
    label: '展示',
  },
  {
    value: false,
    label: '不展示',
  },
];
export const STATUS = [
  {
    value: 'ENABLED',
    label: '有效',
  },
  {
    value: 'DISABLED',
    label: '无效',
  },
];

export const SEX = [
  {
    label: '男',
    value: 'MALE',
  },
  {
    label: '女',
    value: 'FEMALE',
  },
];

export const STATUS_DATE = {
  LEAVE: '未出勤',
  NORMAL: '出勤',
};

export const TYPE_LEAVE = {
  UNPAID_LEAVE: '事假',
  SICK_LEAVE: '病假',
};

export const SICK_LEAVE = {
  EPIDEMIC: '传染病',
  OTHERS: '其他病',
};

export const OPTION_DATE = {
  LEAVE: {
    text: '未出勤',
    value: 'LEAVE',
  },
  NORMAL: {
    text: '出勤',
    value: 'NORMAL',
  },
};
