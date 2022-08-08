import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { TEACHER_STATUS } from '@/constant/common';

export type UpdateProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  schoolData: [];
};

export type FormValueType = {};

const TeacherForm: React.FC<UpdateProps> = ({
  type,
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  schoolData,
}: any) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (values.id) {
      onChange(values.schoolId);
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
  }, [visible]);
  useEffect(() => {}, [formRef?.current?.getFieldValue('schoolId')]);
  const onChange = (e: any) => {
    console.log(e);
  };

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
        const id = type == 'new' ? {} : { id: values.id };
        onSubmit(Object.assign({ ...id, ...value }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormSelect
        disabled={type == 'edit'}
        label="园所名称"
        name="schoolId"
        request={async () => schoolData}
        rules={[
          {
            required: true,
            message: '请选择园所名称',
          },
        ]}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id',
          },
          onChange,
        }}
        width="md"
      />
      <ProFormText
        name="name"
        rules={[
          {
            required: true,
            message: '请输入教师名称',
          },
        ]}
        label="教师名称"
        width="md"
      />
      <ProFormText
        name="mobile"
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
        ]}
        label="手机号"
        width="md"
      />
      {type == 'new' ? (
        <>
          <ProFormText
            name="password"
            fieldProps={{
              type: 'password',
            }}
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            label="密码"
            width="md"
          />
          <ProFormText
            name="password1"
            fieldProps={{
              type: 'password',
            }}
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
            ]}
            label="再次输入密码"
            width="md"
          />
        </>
      ) : null}

      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[
          {
            required: true,
            message: '请选择状态',
          },
        ]}
        options={TEACHER_STATUS}
      />
    </ModalForm>
  );
};

export default memo(TeacherForm);
