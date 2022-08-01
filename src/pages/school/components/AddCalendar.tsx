import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  schoolData: [];
};

export type FormValueType = {};

const AddCalendar: React.FC<UpdateProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  schoolData,
}: any) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    formRef?.current?.resetFields();
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
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormSelect
        label="园所名称"
        name="schoolId"
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
        name="year"
        placeholder="请输入年份"
        rules={[
          {
            required: true,
            message: '请输入年份',
          },
        ]}
        label="年份"
        width="md"
      />
    </ModalForm>
  );
};

export default memo(AddCalendar);
