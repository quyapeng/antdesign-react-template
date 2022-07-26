import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
};

export type FormValueType = {};

const ChangePWD: React.FC<UpdateProps> = ({ title, visible, onCancel, onSubmit, values }: any) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
    }
  }, [visible]);

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
      onFinish={async () => {
        onSubmit(Object.assign({ id: values.id, ...formRef.current?.getFieldsValue() }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText
        name="pwd"
        fieldProps={{
          type: 'text',
        }}
        rules={[
          {
            required: true,
            message: '请输入新密码',
          },
        ]}
        label="新密码"
        width="md"
      />
      <ProFormText
        name="pwd2"
        fieldProps={{
          type: 'text',
        }}
        required
        rules={[
          {
            required: true,
            message: '请确认新密码',
          },
        ]}
        label="新密码确认"
        width="md"
      />
    </ModalForm>
  );
};

export default memo(ChangePWD);
