import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormRadio,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { STATUS } from '@/constant/index';
import { TreeSelect } from 'antd';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  type: string;
  values: Partial<API.RoleItem>;
  activityList: [];
  categoryList: [];
};

export type FormValueType = {};

const AddSourceModelForm: React.FC<UpdateFormProps> = ({
  title,
  values,
  visible,
  onSubmit,
  onCancel,
  activityList,
  categoryList,
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
  const [list, setList] = useState([]);
  useEffect(() => {
    const tem: any = activityList?.map((i: any) => {
      if (i.subActivities && i.subActivities.length > 0) {
        i.disabled = true;
      }
      return i;
    });
    console.log(tem);
    setList(tem);
  }, [activityList]);

  const onChangeTeach = (e: any) => {
    console.log(e);
  };

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
        name="code"
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
        name="name"
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
        name="categoryId"
        label="课程分类"
        options={activityList}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id' },
        }}
        width="md"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
      />
      <ProFormTreeSelect
        initialValue={['0-0-0']}
        label="活动类"
        request={async () => activityList}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'subActivities' },
          treeCheckable: false,
          showCheckedStrategy: TreeSelect.SHOW_CHILD,
          placeholder: '请选择活动类',
          treeDefaultExpandAll: true,
        }}
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
      />
      <ProFormUploadButton
        extra="支持扩展名：.pdf"
        label="教案文档"
        name="teachPaper"
        title="上传"
        onChange={onChangeTeach}
      />
      <ProFormUploadButton
        extra="支持扩展名：.mp4"
        label="教案视屏"
        name="videoResource"
        title="上传"
      />
      <ProFormTextArea name="desc" width="md" label={'课程目标'} placeholder={'请输入课程目标'} />
      <ProFormText name="purpose" label="课程目标" width="md" />
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
