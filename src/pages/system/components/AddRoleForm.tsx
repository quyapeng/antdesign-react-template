import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ROLE_CODE } from '@/constant/index';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  type: string;
  values: Partial<API.RoleItem>;
};

export type FormValueType = {};

const UpdateForm: React.FC<UpdateFormProps> = ({
  title,
  values,
  visible,
  onSubmit,
  onCancel,
  type,
}: any) => {
  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
  }, [values]);
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm
      title={title}
      width="500px"
      formRef={formRef}
      visible={visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async (value: any) => {
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText
        name="title"
        label="角色标题"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
      />
      <ProFormText
        name="name"
        label="角色名称"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
      />
      <ProFormRadio.Group
        name="type"
        label="角色类型"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        options={ROLE_CODE}
      />
      {/* <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        options={STATUS_CODE}
      /> */}
    </ModalForm>
  );
};

export default memo(UpdateForm);
