import React, { useEffect, useRef, memo, useState } from 'react';
import { ModalForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { STATUS } from '@/constant';
import { getMonitor } from '@/services/school';

export type UpdateProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  schoolData: [];
  categoryData: [];
  foodTemData: [];
};

export type FormValueType = {};

const ClassroomForm: React.FC<UpdateProps> = ({
  type,
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  schoolData,
  categoryData,
  foodTemData,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  //
  const [schoolMonitorData, setMonitorData] = useState([]);

  useEffect(() => {
    if (values.id) {
      onChange(values.schoolId);
      formRef?.current?.setFieldsValue(values);
    }
  }, [visible]);
  useEffect(() => {
    // schoolMonitorData
    //
    // setMonitorData();
  }, [formRef?.current?.getFieldValue('schoolId')]);
  const onChange = (e: any) => {
    console.log(e);
    if (e) {
      getMonitor(e).then((res) => {
        const { data } = res;
        setMonitorData(data);
      });
    } else {
      setMonitorData([]);
    }
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
            message: '请输入教室名称',
          },
        ]}
        label="教室名称"
        width="md"
      />
      <ProFormSelect
        label="课程分类名称"
        name="courseCategoryId"
        request={async () => categoryData}
        rules={[
          {
            required: true,
            message: '请选择课程分类名称',
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
      <ProFormSelect
        label="食谱模版名称"
        name="recipeId"
        request={async () => foodTemData}
        rules={[
          {
            required: true,
            message: '请选择食谱模版名称',
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
      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[
          {
            required: true,
            message: '请选择状态',
          },
        ]}
        options={STATUS}
      />
      <ProFormSelect
        label="监控设备"
        name="schoolMonitorIds"
        mode="multiple"
        rules={[
          {
            required: true,
            message: '请选择监控设备',
          },
        ]}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id',
          },
          options: schoolMonitorData,
        }}
        width="md"
      />
    </ModalForm>
  );
};

export default memo(ClassroomForm);
