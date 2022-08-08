import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { allClassroom } from '@/services/school';

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

const SuspensionForm: React.FC<UpdateProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  schoolData,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  //
  const [classData, setClassData] = useState([]);
  const getClassroom = async (id: string | number) => {
    allClassroom({ schoolId: id }).then((res) => {
      console.log(res);
      setClassData(res.data || []);
    });
  };
  useEffect(() => {
    formRef.current?.resetFields();
  }, [visible]);

  const onChange = (e: any) => {
    if (e) {
      getClassroom(e);
    } else {
      setClassData([]);
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
        onSubmit(value);
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
      <ProFormSelect
        label="停课对象"
        name="classroomIds"
        mode="multiple"
        rules={[
          {
            required: true,
            message: '请选择停课对象',
          },
        ]}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id',
          },
          options: classData,
        }}
        width="md"
      />
      <ProFormText
        label="停课原因"
        name="reason"
        rules={[
          {
            required: true,
            message: '请输入停课原因',
          },
        ]}
        width="md"
      />
      <ProFormDateRangePicker
        name="dateRange"
        label="停课周期"
        rules={[
          {
            required: true,
            message: '请选择停课周期',
          },
        ]}
        width="md"
      />
    </ModalForm>
  );
};

export default memo(SuspensionForm);
