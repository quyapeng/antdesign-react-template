export const NUMBER_RULES =
  /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
export const UPLOAD = 'http://kinder-care.oss-cn-shanghai.aliyuncs.com';

export const Message = {
  New: '创建成功',
  Edit: '编辑成功',
  Delete: '删除成功',
  Set: '设置成功',
  Options: '操作成功',
  Upload: '导入成功',
  NoEdit: '当前账户不支持此处修改',
  Password: '密码已重置为：123456',
  Change: '修改成功',
  SendCode: '验证码发送成功',
  NoRouter: '当前用户暂无任何权限，请联系管理员。',
  Action: '创建',
};

export const DIS_STYLE = {
  color: 'rgba(0,0,0,.25)',
  cursor: 'not-allowed',
};

export const STATUS = {
  ENABLED: {
    text: '有效',
    status: 'ENABLED',
  },
  DISABLED: {
    text: '无效',
    status: 'DISABLED',
  },
};

export const STATUS_USER = {
  PENDING: {
    text: '待激活',
    status: 'PENDING',
  },
  NORMAL: {
    text: '正常',
    status: 'NORMAL',
  },
  SUSPENDED: {
    text: '冻结',
    status: 'SUSPENDED',
  },
};

export const STATUS_SCHOOL = {
  PENDING: {
    text: '待审批',
    status: 'PENDING',
  },
  NORMAL: {
    text: '已审批',
    status: 'NORMAL',
  },
};

export const SCHOOL_TYPE = {
  KINDERGARDEN: {
    text: '幼儿园',
    status: 'KINDERGARDEN',
  },
  NURSERY: {
    text: '托育园',
    status: 'NURSERY',
  },
};

export const FRANCH_TYPE = {
  DIRECT: {
    text: '直供',
    status: 'DIRECT',
  },
  THIRD_PARTY: {
    text: '代理',
    status: 'THIRD_PARTY',
  },
};

export const ACTIVED_STATUS = {
  1: {
    text: '已激活',
    status: true,
  },
  0: {
    text: '未激活',
    status: false,
  },
};

// ENROLLED, GRADUATE

export const STUDENT_STATUS = {
  ENROLLED: {
    text: '在读',
    status: 'ENROLLED',
  },
  GRADUATE: {
    text: '毕业',
    status: 'GRADUATE',
  },
  PENDING: {
    text: '待分班',
    status: 'PENDING',
  },
};

export const STUDENT_TYPE = {
  ENROLLED: {
    text: '在读',
    status: 'ENROLLED',
  },
  GRADUATE: {
    text: '毕业',
    status: 'GRADUATE',
  },
};

export const TEACHER_TYPE = {
  INCUMBENT: {
    text: '在职',
    status: 'INCUMBENT',
  },
  DIMISSION: {
    text: '离职',
    status: 'DIMISSION',
  },
};

export const TEACHER_STATUS = [
  {
    value: 'DIMISSION',
    label: '离职',
  },
  {
    value: 'INCUMBENT',
    label: '在职',
  },
];
