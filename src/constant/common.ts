export const NUMBER_RULES =
  /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
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
