import React, { useEffect, useRef, memo, useState } from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { teacherListBySchool } from '@/services/school';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  teacherData: [];
};

const ClassForm: React.FC<UpdateProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  teacherData,
}: any) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    const { school, name, courseCategory, teacherIds } = values;
    formRef.current?.setFieldsValue({
      school: school.name,
      name: name,
      courseCategory: courseCategory?.name,
      teacherIds,
    });
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
        onSubmit(Object.assign({ id: values.id, teacherIds: value.teacherIds }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText name="school" label="园所名称" width="md" disabled />
      <ProFormText name="name" label="教室名称" width="md" disabled />
      <ProFormText name="courseCategory" label="课程分类名称" width="md" disabled />
      <ProFormSelect
        label="带班教师"
        name="teacherIds"
        mode="multiple"
        request={async () => teacherData}
        rules={[
          {
            required: true,
            message: '请选择带班教师',
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
    </ModalForm>
  );
};

export default memo(ClassForm);
