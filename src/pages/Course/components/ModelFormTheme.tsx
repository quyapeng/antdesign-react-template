import React, { useEffect, useRef, memo } from 'react';
import ProForm, { ModalForm, ProFormText, ProFormRadio, ProFormSelect } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
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
      onFinish={async (value) => {
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      {/* <ProForm.Group></ProForm.Group> */}
      <ProFormSelect
        width="xs"
        options={[
          {
            value: 'month',
            label: '月主题',
          },
        ]}
        name="type"
        label="主题类型"
      />
      <ProFormText width="md" name="content" label="主题内容" placeholder="请输入主题内容" />
      <ProForm.Group>
        
      </ProForm.Group>
    </ModalForm>
  );
};

export default memo(UpdateForm);
