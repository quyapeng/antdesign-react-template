import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

export type UpdateProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  schoolData: [];
};

const NoticeForm: React.FC<UpdateProps> = ({
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
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
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
      onFinish={async (value: any) => {
        values.id ? (value.id = values.id) : null;
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormSelect
        label="园所名称"
        name="schoolId"
        disabled={type == 'edit'}
        placeholder="请选择园所名称"
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
        }}
        width="md"
      />
      <ProFormText
        name="title"
        placeholder="通知主题"
        rules={[
          {
            required: true,
            message: '请输入通知主题',
          },
        ]}
        label="通知主题"
        width="md"
      />
      <ProFormTextArea
        name="content"
        placeholder="通知内容"
        rules={[
          {
            required: true,
            message: '请输入通知内容',
          },
        ]}
        label="通知内容"
        width="md"
      />
    </ModalForm>
  );
};

export default memo(NoticeForm);
