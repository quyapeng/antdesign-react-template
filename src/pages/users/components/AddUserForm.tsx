import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormText, ProFormSelect, ProFormRadio } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { STATUS_CODE } from '@/constant/index';

import { roleOperationList } from '@/services/user';
import { useRequest } from 'umi';
// import { NUMBER_RULES } from '@/constant/common';

export type UpdateFormProps = {
  title: string;
  type: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<API.UserItem>;
};

export type FormValueType = {};

const AddUserForm: React.FC<UpdateFormProps> = ({
  title,
  type,
  visible,
  onCancel,
  onSubmit,
  values,
}: any) => {
  useEffect(() => {
    if (values.userId) {
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
  }, [values]);
  const formRef = useRef<ProFormInstance>();

  const { data: options } = useRequest(roleOperationList, {
    manual: false,
  });

  return (
    <ModalForm
      title={title}
      formRef={formRef}
      visible={visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async (value: any) => {
        if (values.userId) {
          value.userId = values.userId;
        }
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText
        name="name"
        label="姓名"
        rules={[
          {
            required: true,
            message: '请输入姓名',
          },
        ]}
        width="md"
      />
      <ProFormText
        name="mobile"
        label="手机号"
        rules={[
          {
            required: false,
          },
        ]}
        width="md"
      />
      {type == 'new' ? (
        <>
          <ProFormText.Password
            disabled={type !== 'new'}
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                message: '两次输入密码不一致',
              },
            ]}
            width="md"
          />
          <ProFormText.Password
            label="再次输入密码"
            name="passwordAgain"
            disabled={type !== 'new'}
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              {
                validator: (rule, value) => {
                  if (value && value !== formRef?.current?.getFieldValue('password')) {
                    return Promise.reject('两次密码不一致');
                  }
                  return Promise.resolve();
                },
                message: '两次输入密码不一致',
              },
            ]}
            width="md"
          />
        </>
      ) : null}

      <ProFormSelect
        label="角色"
        name="roleId"
        rules={[
          {
            required: true,
            message: '请选择账户角色',
          },
        ]}
        options={options}
        fieldProps={{
          fieldNames: {
            label: 'title',
            value: 'id',
          },
        }}
        width="md"
      />
      {type == 'new' ? (
        <ProFormRadio.Group
          name="status"
          label="状态"
          rules={[
            {
              required: true,
              message: '请选择状态',
            },
          ]}
          options={STATUS_CODE}
        />
      ) : null}
    </ModalForm>
  );
};

export default memo(AddUserForm);
