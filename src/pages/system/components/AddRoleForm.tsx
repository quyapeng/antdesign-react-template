import React from 'react';
import { Modal } from 'antd';
import { ModalForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RoleItem>;
};

export type FormValueType = {};

const UpdateForm: React.FC<UpdateFormProps> = (props: any) => {
  console.log(props);
  return (
    <ModalForm
      title={props.title}
      width="500px"
      visible={props.visible}
      onVisibleChange={props.handleModalVisible}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async (value) => {
        console.log(value);
        // const success = await handleAdd(value as any);
        // if (success) {
        //   handleModalVisible(false);
        //   if (actionRef.current) {
        //     actionRef.current.reload();
        //   }
        // }
      }}
    >
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
        options={[
          {
            value: '0',
            label: '系统角色',
          },
          {
            value: '1',
            label: '业务角色',
          },
        ]}
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
        options={[
          {
            value: '0',
            label: '待激活',
          },
          {
            value: '1',
            label: '正常',
          },
          {
            value: '2',
            label: '禁用',
          },
        ]}
      />
      <ProFormTextArea name="desc" width="md" label={'备注'} placeholder={'请输入备注'} />
    </ModalForm>
  );
};

export default UpdateForm;
