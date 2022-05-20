import React from 'react';
import { ModalForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { STATUS_CODE, ROLE_CODE } from '@/constant/index';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  // updateModalVisible: boolean;
  values: Partial<API.RoleItem>;
};

export type FormValueType = {};

const UpdateForm: React.FC<UpdateFormProps> = (props: any) => {
  console.log(props);
  return (
    <ModalForm
      title={props.title}
      width="500px"
      initialValues={props}
      visible={props.visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async (value) => {
        props.onSubmit(value);
      }}
      modalProps={{
        onCancel: () => props.onCancel(),
      }}
    >
      {/* <ProForm initialValues={props.value} ></ProForm> */}

      <ProFormText
        label="角色名称"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="name"
      />
      <ProFormText
        label="角色编码"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="code"
      />
      <ProFormText
        label="角色前缀"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="accPrefix"
      />
      <ProFormText
        label="角色权重"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="weight"
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
      <ProFormRadio.Group
        label="状态"
        name="status"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        options={STATUS_CODE}
      />
      <ProFormTextArea name="desc" width="md" label={'备注'} placeholder={'请输入备注'} />
    </ModalForm>
  );
};

export default UpdateForm;
