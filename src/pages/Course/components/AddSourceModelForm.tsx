import React, { useEffect, useRef, memo } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormRadio,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { STATUS } from '@/constant/index';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  type: string;
  values: Partial<API.RoleItem>;
};

export type FormValueType = {};

const AddSourceModelForm: React.FC<UpdateFormProps> = ({
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
      width="60%"
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
        label="课程编号"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
      />
      <ProFormText
        name="title"
        label="课程名称"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
      />
      <ProFormSelect
        name="type"
        label="课程分类"
        options={[
          {
            value: 'month',
            label: '月主题',
          },
        ]}
        width="md"
      />
      <ProFormSelect
        name="type"
        label="活动大类"
        options={[
          {
            value: 'month',
            label: '月主题',
          },
        ]}
        width="md"
      />
      <ProFormSelect
        name="type"
        label="活动小类"
        options={[
          {
            value: 'month',
            label: '月主题',
          },
        ]}
        width="md"
      />
      <ProFormUploadButton extra="支持扩展名：.pdf" label="教案文档" name="file" title="上传" />
      <ProFormUploadButton extra="支持扩展名：.mp4" label="教案视屏" name="file" title="上传" />
      <ProFormTextArea name="desc" width="md" label={'课程目标'} placeholder={'请输入课程目标'} />
      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        options={STATUS}
      />
    </ModalForm>
  );
};

export default memo(AddSourceModelForm);
